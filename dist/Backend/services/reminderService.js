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
const reminderDto_js_1 = require("../dto/reminderDto.js");
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
    // Initialize reminders (e.g., scheduling email notifications for all active reminders)
    initializeReminders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reminders = yield this.getAllReminders();
                for (const reminder of reminders) {
                    if (!reminder.completed) {
                        yield this.scheduleReminderEmail(reminder); // Schedule email notifications
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
                // Logic for scheduling email notifications
                console.log(`Scheduling email for reminder: ${reminder.description}`);
                // Example: Use a task scheduler like node-cron or Agenda.js here
            }
            catch (error) {
                console.error("Error during email scheduling:", error);
                throw error;
            }
        });
    }
    // Validation logic for reminder data
    validateReminderData(data, isUpdate = false) {
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
exports.ReminderService = ReminderService;
