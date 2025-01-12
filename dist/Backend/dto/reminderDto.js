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
exports.ReminderDto = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ReminderDto {
    constructor() {
        this.completed = false;
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate data
                if (!data.license_plate || !data.description) {
                    throw new Error('License plate and description are required');
                }
                // Log the data
                console.log("Creating reminder with data:", data);
                return yield prisma.reminder.create({
                    data: Object.assign(Object.assign({}, data), { due_date: data.due_date ? new Date(data.due_date) : null, start_date: data.start_date ? new Date(data.start_date) : null, start_odometer: data.start_odometer }),
                });
            }
            catch (error) {
                console.error("Error during reminder creation:", error);
                throw error;
            }
        });
    }
    // Static method to get all reminders
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.reminder.findMany();
        });
    }
    // Static method to update a specific reminder
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Updating reminder with id:", id, "and data:", data); // Log inputs
                return yield prisma.reminder.update({
                    where: { id },
                    data,
                });
            }
            catch (error) {
                console.error("Error updating reminder in Prisma:", error); // Log Prisma error
                throw error; // Re-throw for the service layer to catch
            }
        });
    }
    // Static method to delete a reminder
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.reminder.delete({
                where: { id },
            });
        });
    }
}
exports.ReminderDto = ReminderDto;
