import { PrismaClient } from '@prisma/client';
import { ReminderDto } from '../dto/reminderDto.js';
import { EmailService } from './emailService';

const prisma = new PrismaClient();
const emailService = new EmailService();

export class ReminderService {
  // Create a new reminder
  async createReminder(data: ReminderDto) {
    try {
      this.validateReminderData(data); // Validate reminder data

      // Format the due_date to ISO-8601 if provided as a string
      if (data.due_date && typeof data.due_date === 'string') {
        const parsedDate = new Date(data.due_date);
        if (isNaN(parsedDate.getTime())) {
          throw new Error('Due date must be a valid ISO-8601 string');
        }
        data.due_date = parsedDate; // Store as a Date object
      }

      // Create the reminder record
      const reminder = await ReminderDto.create(data);

      return reminder;
    } catch (error) {
      console.error("Error during reminder creation:", error);
      throw error;
    }
  }

  // Retrieve all reminders
  async getAllReminders() {
    return ReminderDto.getAll(); // Retrieve all reminders
  }

  // Update a reminder
  async updateReminder(id: number, data: Partial<ReminderDto>) {
    try {
      this.validateReminderData(data, true); // Validate reminder data for update

      // Format the due_date to ISO-8601 if provided as a string
      if (data.due_date && typeof data.due_date === 'string') {
        const parsedDate = new Date(data.due_date);
        if (isNaN(parsedDate.getTime())) {
          throw new Error('Due date must be a valid ISO-8601 string');
        }
        data.due_date = parsedDate; // Store as a Date object
      }

      const updatedReminder = await ReminderDto.update(id, data); // Update the reminder
      return updatedReminder;
    } catch (error) {
      console.error("Error during reminder update:", error);
      throw error;
    }
  }

  // Delete a reminder
  async deleteReminder(id: number) {
    return ReminderDto.delete(id); // Delete the reminder
  }

  
  // Initialize reminders
  async initializeReminders() {//Schedules notifications for incomplete reminders during initialization.
    try {
      const reminders = await this.getAllReminders();
      for (const reminder of reminders) {
        if (!reminder.completed) {
          await this.scheduleReminderEmail(reminder);
        }
      }
    } catch (error) {
      console.error("Error during reminder initialization:", error);
      throw error;
    }
  }

  // Schedule email notifications for a reminder
  async scheduleReminderEmail(reminder: ReminderDto) {
    try {
      // First check if the reminder needs a notification
      const needsNotification = await this.checkReminderConditions(reminder);
      
      if (needsNotification) {
        await this.sendReminderNotification(reminder);
      }
    } catch (error) {
      console.error("Error during email scheduling:", error);
      throw error;
    }
  }

  // Validation logic for reminder data
  private validateReminderData(data: Partial<ReminderDto>, isUpdate = false) {
    if (!isUpdate) {
      if (!data.license_plate) {
        throw new Error('License plate is required');
      }
      if (!data.description) {
        throw new Error('Description is required');
      }
    }

    if (data.next_due_km !== undefined) {
      const nextDueKm = Number(data.next_due_km);
      if (isNaN(nextDueKm) || nextDueKm <= 0) {
        throw new Error('Next due km must be a positive number');
      }
    }

    if (data.repeat_by_days !== undefined) {
      const repeatByDays = Number(data.repeat_by_days);
      if (isNaN(repeatByDays) || repeatByDays <= 0) {
        throw new Error('Repeat by days must be a positive number');
      }
    }

    if (data.notify_before_km !== undefined) {
      const notifyBeforeKm = Number(data.notify_before_km);
      if (isNaN(notifyBeforeKm) || notifyBeforeKm <= 0) {
        throw new Error('Notify before km must be a positive number');
      }
    }

    if (data.notify_before_days !== undefined) {
      const notifyBeforeDays = Number(data.notify_before_days);
      if (isNaN(notifyBeforeDays) || notifyBeforeDays <= 0) {
        throw new Error('Notify before days must be a positive number');
      }
    }

    if (data.due_date && typeof data.due_date === 'string') {
      const parsedDate = new Date(data.due_date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Due date must be a valid ISO-8601 string');
      }
    }
  }

  async checkDailyReminders() {
    try {
      const currentDate = new Date();
      const reminders = await this.getAllReminders();
      
      for (const reminder of reminders) {
        if (reminder.completed) continue;

        const needsNotification = await this.checkReminderConditions(reminder);
        
        if (needsNotification) {
          await this.sendReminderNotification(reminder);
        }
      }
    } catch (error) {
      console.error("Error checking daily reminders:", error);
      throw error;
    }
  }

  private async checkReminderConditions(reminder: ReminderDto): Promise<boolean> {
    try {
      // Get the associated car's current odometer reading
      const car = await prisma.car.findUnique({
        where: { license_plate: reminder.license_plate }
      });

      if (!car) {
        throw new Error(`Car not found for license plate: ${reminder.license_plate}`);
      }

      let needsNotification = false;

      // Check date-based conditions
      if (reminder.due_date) {
        const daysUntilDue = Math.ceil((reminder.due_date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));//Calculates the number of days until the due_date
        
        if (daysUntilDue <= 0) {//Checks if the due_date has already passed
          needsNotification = true;
        } else if (reminder.notify_before_days && daysUntilDue <= reminder.notify_before_days) {
          needsNotification = true;
        }
      }

      // Check odometer-based conditions
      if (reminder.next_due_km) {
        const kmUntilDue = reminder.next_due_km - car.odometer;
        
        if (kmUntilDue <= 0) {
          needsNotification = true;
        } else if (reminder.notify_before_km && kmUntilDue <= reminder.notify_before_km) {
          needsNotification = true;
        }
      }

      return needsNotification;
    } catch (error) {
      console.error("Error checking reminder conditions:", error);
      throw error;
    }
  }

  private async sendReminderNotification(reminder: ReminderDto) {
    try {
      const car = await prisma.car.findUnique({
        where: { license_plate: reminder.license_plate }
      });
  
      if (!car) {
        throw new Error(`Car not found for license plate: ${reminder.license_plate}`);
      }
  
      const subject = `Vehicle Maintenance Reminder: ${reminder.description}`;
      const markAsDoneUrl = `${process.env.APP_URL}/reminders/complete/${reminder.id}`;
  
      const htmlContent = `
        <h2>Maintenance Reminder</h2>
        <p>Vehicle: ${car.make} ${car.model} (${reminder.license_plate})</p>
        <p>Reminder: ${reminder.description}</p>
        <p>Current Odometer: ${car.odometer} km</p>
        ${reminder.next_due_km ? `<p>Due at: ${reminder.next_due_km} km</p>` : ''}
        ${reminder.due_date ? `<p>Due date: ${reminder.due_date.toLocaleDateString()}</p>` : ''}
        <a href="${markAsDoneUrl}" style="display: inline-block; padding: 10px 15px; font-size: 16px; color: white; background-color: green; text-decoration: none; border-radius: 5px;">
          Mark as Done
        </a>
      `;
  
      await emailService.sendReminder(process.env.NOTIFICATION_EMAIL!, subject, htmlContent);
    } catch (error) {
      console.error("Error sending reminder notification:", error);
      throw error;
    }
  }
  
}
