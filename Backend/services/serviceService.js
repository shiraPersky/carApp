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
exports.ServiceService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ServiceService {
    createService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate input data
            this.validateServiceData(data);
            // Create service record in the database using Prisma
            try {
                const newService = yield prisma.service.create({
                    data: {
                        car_id: data.car_id, //(must)
                        service_type: data.service_type, // Type of service(must)
                        date: new Date(data.date), // Date of the service
                        time: data.time, // Time of the service
                        odometer: data.odometer, // Odometer reading
                        place: data.place, // Place of service
                        driver: data.driver, // Driver's name or ID
                        paymentMethod: data.payment_method, // Payment method used
                        cost: data.cost, // Cost of the service
                        notes: data.notes, // Additional notes
                        file_attachment: data.file_attachment, // (file)
                        reminderKilometers: data.reminder_kilometers, // Reminder (in kilometers)
                        reminderMonths: data.reminder_months, // Reminder (in months)
                    },
                });
                return newService;
            }
            catch (error) {
                throw new Error(`Failed to create service: ${error.message}`);
            }
        });
    }
    // Validation logic for service data
    validateServiceData(data) {
        if (!data.service_type || !data.car_id) {
            throw new Error('Car ID and Service Type are required');
        }
        if (data.odometer && data.odometer <= 0) {
            throw new Error('Odometer must be a positive number');
        }
        if (data.cost && data.cost <= 0) {
            throw new Error('Cost must be a positive number');
        }
        if (data.reminder_kilometers && data.reminder_kilometers <= 0) {
            throw new Error('Reminder kilometers must be a positive number');
        }
        if (data.reminder_months && data.reminder_months <= 0) {
            throw new Error('Reminder months must be a positive number');
        }
    }
    getAllServices() {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate getting all services from the database
            return [{ id: 1, type: 'Oil Change' }, { id: 2, type: 'Brake Check' }];
        });
    }
    updateService(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate updating a service
            return Object.assign({ id }, data);
        });
    }
    deleteService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate deleting a service
            return { id };
        });
    }
}
exports.ServiceService = ServiceService;
