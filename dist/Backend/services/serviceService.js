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
const serviceDto_js_1 = require("../dto/serviceDto.js");
const client_1 = require("@prisma/client");
const add_carDto_js_1 = require("../dto/add_carDto.js");
const prisma = new client_1.PrismaClient();
class ServiceService {
    // Create a new service with validation
    createService(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateServiceData(data); // Call the private validation method. Throws error if data is invalid
            try {
                // Perform type casting before creating the service
                data.car_id = parseInt(data.car_id, 10); // Ensure car_id is an integer
                data.odometer = parseInt(data.odometer, 10); // Ensure odometer is an integer
                data.cost = parseFloat(data.cost); // Ensure cost is a float
                data.license_plate = data.license_plate || ""; // Set a default or validate
                // Ensure date is a valid Date object or ISO-8601 string
                if (typeof data.date === 'string') {
                    data.date = new Date(data.date).toISOString(); // Convert to ISO-8601 string if it's a string
                }
                const service = yield serviceDto_js_1.ServiceDto.create(data); // Attempt to create service
                // Update car's odometer after refueling
                yield add_carDto_js_1.CarDto.updateOdometer(data.license_plate, data.odometer);
                return service;
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Error during service creation:", error.message); // Log specific error message
                }
                else {
                    console.error("An unknown error occurred:", error); // Log the unknown error
                }
                throw error; // Rethrow error to be caught by controller
            }
        });
    }
    getAllServices() {
        return __awaiter(this, void 0, void 0, function* () {
            return serviceDto_js_1.ServiceDto.getAll(); // Call the DTO method
        });
    }
    // Update a service with validation
    updateService(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Perform type casting before creating the service
                data.car_id = parseInt(data.car_id, 10); // Ensure car_id is an integer
                data.odometer = parseInt(data.odometer, 10); // Ensure odometer is an integer
                data.cost = parseFloat(data.cost); // Ensure cost is a float
                data.license_plate = data.license_plate || ""; // Set a default or validate
                // Ensure the date is in ISO-8601 format if it's a string
                if (data.date && typeof data.date === 'string') {
                    data.date = new Date(data.date).toISOString(); // Format date to ISO-8601 string
                }
                // Validate data before updating
                this.validateServiceData(data, true); // Validation
                // Update car's odometer after refueling
                yield add_carDto_js_1.CarDto.updateOdometer(data.license_plate, data.odometer);
                // Update service in the database
                const updatedService = yield serviceDto_js_1.ServiceDto.update(id, data); // Call DTO method
                return updatedService;
            }
            catch (error) {
                console.error("Error in updateService:", error); // Log the error
                throw error; // Re-throw for the controller to catch
            }
        });
    }
    // Delete a service
    deleteService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return serviceDto_js_1.ServiceDto.delete(id); // Call the DTO method
        });
    }
    // Validation logic for service data
    validateServiceData(data, isUpdate = false) {
        if (!isUpdate) {
            if (!data.service_type || !data.car_id) {
                console.error("Validation failed: Missing service_type or car_id");
                throw new Error('Car ID and Service Type are required');
            }
        }
        if (data.odometer !== undefined && data.odometer <= 0) {
            console.error("Validation failed: Invalid odometer value");
            throw new Error('Odometer must be a positive number');
        }
        if (data.cost !== undefined && data.cost <= 0) {
            console.error("Validation failed: Invalid cost value");
            throw new Error('Cost must be a positive number');
        }
    }
}
exports.ServiceService = ServiceService;
