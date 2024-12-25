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
exports.CarService = void 0;
const add_carDto_js_1 = require("../dto/add_carDto.js");
class CarService {
    // Create a new car record with validation
    createCar(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validateCarData(data); // Validate car data
                // Ensure the dates are valid and in ISO-8601 format if they're strings
                if (data.valid_until && typeof data.valid_until === 'string') {
                    // Ensure valid date format before converting
                    if (isNaN(Date.parse(data.valid_until))) {
                        throw new Error('Valid until must be a valid ISO-8601 date');
                    }
                    data.valid_until = new Date(data.valid_until); // Convert to Date object
                }
                if (data.last_test && typeof data.last_test === 'string') {
                    // Ensure valid date format before converting
                    if (isNaN(Date.parse(data.last_test))) {
                        throw new Error('Last test must be a valid ISO-8601 date');
                    }
                    data.last_test = new Date(data.last_test); // Convert to Date object
                }
                // Log and inspect the data to ensure valid date objects before passing to Prisma
                console.log('Prepared Car Data:', data);
                const car = yield add_carDto_js_1.CarDto.create(data); // Create car record
                return car;
            }
            catch (error) {
                console.error('Error during car creation:', error);
                throw error;
            }
        });
    }
    // Retrieve all car records
    getAllCars() {
        return __awaiter(this, void 0, void 0, function* () {
            return add_carDto_js_1.CarDto.getAll(); // Retrieve all car records
        });
    }
    // Update a car record
    updateCar(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Perform validation using the updated validateCarData method
                this.validateCarData(data, true); // Validate updated data (isUpdate = true)
                // Ensure the dates are valid and in ISO-8601 format if they're strings
                if (data.valid_until && typeof data.valid_until === 'string') {
                    // Ensure valid date format before converting
                    if (isNaN(Date.parse(data.valid_until))) {
                        throw new Error('Valid until must be a valid ISO-8601 date');
                    }
                    data.valid_until = new Date(data.valid_until); // Convert to Date object
                }
                if (data.last_test && typeof data.last_test === 'string') {
                    // Ensure valid date format before converting
                    if (isNaN(Date.parse(data.last_test))) {
                        throw new Error('Last test must be a valid ISO-8601 date');
                    }
                    data.last_test = new Date(data.last_test); // Convert to Date object
                }
                // Log and inspect the data to ensure valid date objects before passing to Prisma
                console.log('Updated Car Data:', data);
                const updatedCar = yield add_carDto_js_1.CarDto.update(id, data); // Update car record
                return updatedCar;
            }
            catch (error) {
                console.error('Error during car update:', error);
                throw error;
            }
        });
    }
    // Delete a car record
    deleteCar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return add_carDto_js_1.CarDto.delete(id); // Delete car record
        });
    }
    // Validation logic for car data
    validateCarData(data, isUpdate = false) {
        // If it's an update, some fields may be optional
        if (!isUpdate) {
            if (!data.license_plate || !data.make || !data.model || !data.year || !data.color || !data.valid_until || !data.last_test || !data.model_type || !data.model_number) {
                throw new Error('Required fields are missing: license_plate, make, model, year, color, valid_until, last_test, model_type, model_number');
            }
        }
        // Ensure year is a valid positive number
        if (data.year !== undefined) {
            const yearValue = Number(data.year);
            if (isNaN(yearValue) || yearValue <= 0) {
                throw new Error('Year must be a positive number');
            }
            data.year = yearValue;
        }
        // Ensure valid_until and last_test are valid dates
        if (data.valid_until && isNaN(Date.parse(data.valid_until.toString()))) {
            throw new Error('Valid until must be a valid ISO-8601 date');
        }
        if (data.last_test && isNaN(Date.parse(data.last_test.toString()))) {
            throw new Error('Last test must be a valid ISO-8601 date');
        }
    }
}
exports.CarService = CarService;
