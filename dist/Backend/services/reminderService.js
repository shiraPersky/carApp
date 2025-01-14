"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderService = void 0;
const client_1 = require("@prisma/client");
const reminderDto_js_1 = require("../dto/reminderDto.js");
const emailService_1 = require("./emailService");
const prisma = new client_1.PrismaClient();
const emailService = new emailService_1.EmailService();
class ReminderService {
    // Create a new reminder
    createReminder(data) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const reminder = yield reminderDto_js_1.ReminderDto.create(data);
                return reminder;
            }
            catch (error) {
                console.error("Error during reminder creation:", error);
                throw error;
            }
        });
    }
    // Retrieve all reminders
    getAllReminders() {
        return __awaiter(this, void 0, void 0, function* () {
            return reminderDto_js_1.ReminderDto.getAll(); // Retrieve all reminders
        });
    }
    // Update a reminder
    updateReminder(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const updatedReminder = yield reminderDto_js_1.ReminderDto.update(id, data); // Update the reminder
                return updatedReminder;
            }
            catch (error) {
                console.error("Error during reminder update:", error);
                throw error;
            }
        });
    }
    // Delete a reminder
    deleteReminder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return reminderDto_js_1.ReminderDto.delete(id); // Delete the reminder
        });
    }
    markAsComplete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reminder = yield reminderDto_js_1.ReminderDto.update(id, { completed: true });
                return reminder;
            }
            catch (error) {
                console.error('Error marking reminder as complete:', error);
                throw error;
            }
        });
    }
    // Initialize reminders
    initializeReminders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reminders = yield this.getAllReminders();
                for (const reminder of reminders) {
                    if (!reminder.completed) {
                        yield this.scheduleReminderEmail(reminder);
                    }
                }
            }
            catch (error) {
                console.error("Error during reminder initialization:", error);
                throw error;
            }
        });
    }
    // Schedule email notifications for a reminder
    scheduleReminderEmail(reminder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // First check if the reminder needs a notification
                const needsNotification = yield this.checkReminderConditions(reminder);
                if (needsNotification) {
                    yield this.sendReminderNotification(reminder);
                }
            }
            catch (error) {
                console.error("Error during email scheduling:", error);
                throw error;
            }
        });
    }
    validateReminderData(data, isUpdate = false) {
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
    checkDailyReminders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const reminders = yield this.getAllReminders();
                for (const reminder of reminders) {
                    if (reminder.completed)
                        continue;
                    const needsNotification = yield this.checkReminderConditions(reminder);
                    if (needsNotification) {
                        yield this.sendReminderNotification(reminder);
                    }
                }
            }
            catch (error) {
                console.error("Error checking daily reminders:", error);
                throw error;
            }
        });
    }
    checkReminderConditions(reminder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the associated car's current odometer reading
                const car = yield prisma.car.findUnique({
                    where: { license_plate: reminder.license_plate }
                });
                if (!car) {
                    throw new Error(`Car not found for license plate: ${reminder.license_plate}`);
                }
                let needsNotification = false;
                // Check date-based conditions
                if (reminder.due_date) {
                    const daysUntilDue = Math.ceil((reminder.due_date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)); //Calculates the number of days until the due_date
                    if (daysUntilDue <= 0) { //Checks if the due_date has already passed
                        needsNotification = true;
                    }
                    else if (reminder.notify_before_days && daysUntilDue <= reminder.notify_before_days) {
                        needsNotification = true;
                    }
                }
                // Check odometer-based conditions
                if (reminder.next_due_km) {
                    const kmUntilDue = reminder.next_due_km - car.odometer;
                    if (kmUntilDue <= 0) {
                        needsNotification = true;
                    }
                    else if (reminder.notify_before_km && kmUntilDue <= reminder.notify_before_km) {
                        needsNotification = true;
                    }
                }
                return needsNotification;
            }
            catch (error) {
                console.error("Error checking reminder conditions:", error);
                throw error;
            }
        });
    }
    sendReminderNotification(reminder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const car = yield prisma.car.findUnique({
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
                yield emailService.sendReminder(process.env.NOTIFICATION_EMAIL, subject, htmlContent);
            }
            catch (error) {
                console.error("Error sending reminder notification:", error);
                throw error;
            }
        });
    }
}
exports.ReminderService = ReminderService;
