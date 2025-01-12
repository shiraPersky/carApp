import { ReminderDto } from '../dto/reminderDto.js';
import { CarDto } from '../dto/add_carDto.js';

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

  // Initialize reminders (e.g., scheduling email notifications for all active reminders)
  async initializeReminders() {
    try {
      const reminders = await this.getAllReminders();
      for (const reminder of reminders) {
        if (!reminder.completed) {
          await this.scheduleReminderEmail(reminder); // Schedule email notifications
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
      // Logic for scheduling email notifications
      console.log(`Scheduling email for reminder: ${reminder.description}`);
      // Example: Use a task scheduler like node-cron or Agenda.js here
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
}
