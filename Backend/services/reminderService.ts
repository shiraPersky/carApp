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

  async markAsComplete(id: number) {
    try {
      const reminder = await ReminderDto.update(id, { completed: true });
      return reminder;
    } catch (error) {
      console.error('Error marking reminder as complete:', error);
      throw error;
    }
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

  private validateReminderData(data: Partial<ReminderDto>, isUpdate = false) {
    if (!isUpdate) {
      if (!data.license_plate) {
        throw new Error('License plate is required');
      }
      if (!data.description) {
        throw new Error('Description is required');
      }
    }
  
    // Validation for one-time reminders
    if (!data.repeat_by_days && !data.repeat_by_km) {
      // One-time by date
      if (!data.due_date && !data.next_due_km) {
        throw new Error('Either due date or next due km is required for one-time reminders');
      }
      if (data.due_date && data.notify_before_days !== undefined && data.notify_before_days <= 0) {
        throw new Error('Notify before days must be a positive number');
      }
      if (data.next_due_km && data.notify_before_km !== undefined && data.notify_before_km <= 0) {
        throw new Error('Notify before km must be a positive number');
      }
    }
  
    // Validation for repeat reminders
    if (data.repeat_by_days || data.repeat_by_km) {
      if (!data.start_date) {
        throw new Error('Start date is required for repeat reminders');
      }
      if (data.repeat_by_km && !data.start_odometer) {
        throw new Error('Start odometer is required for km-based repeat reminders');
      }
      if (data.repeat_by_days !== undefined && data.repeat_by_days <= 0) {
        throw new Error('Repeat by days must be a positive number');
      }
      if (data.repeat_by_km !== undefined && data.repeat_by_km <= 0) {
        throw new Error('Repeat by km must be a positive number');
      }
    }
  
    // Ensure consistency with date format
    if (data.due_date && typeof data.due_date === 'string') {
      const parsedDate = new Date(data.due_date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Due date must be a valid ISO-8601 string');
      }
      data.due_date = parsedDate; // Store as a Date object
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
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top: 20px;">
      <tr>
        <td align="center" style="border-radius: 3px;" bgcolor="#007BFF">
          <a href="${markAsDoneUrl}" target="_blank" style="
            font-size: 16px;
            font-family: Arial, sans-serif;
            font-weight: bold;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 5px;
            display: inline-block;
          ">Mark as Done</a>
        </td>
      </tr>
    </table>
  `;



    await emailService.sendReminder(process.env.NOTIFICATION_EMAIL!, subject, htmlContent);
  } catch (error) {
    console.error("Error sending reminder notification:", error);
    throw error;
  }
}

}
