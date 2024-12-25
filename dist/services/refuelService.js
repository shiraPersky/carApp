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
exports.RefuelingService = void 0;
const refuelDto_js_1 = require("../dto/refuelDto.js");
class RefuelingService {
    // Create a new refueling record with validation
    createRefueling(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validateRefuelingData(data); // Validate refueling data
                // Ensure the date is in ISO-8601 format if it's a string
                if (data.date && typeof data.date === 'string') {
                    data.date = new Date(data.date).toISOString(); // Format date to ISO-8601 string
                }
                const refueling = yield refuelDto_js_1.RefuelingDto.create(data); // Create refueling record
                return refueling;
            }
            catch (error) {
                console.error("Error during refueling creation:", error);
                throw error;
            }
        });
    }
    // Retrieve all refueling records
    getAllRefuelings() {
        return __awaiter(this, void 0, void 0, function* () {
            return refuelDto_js_1.RefuelingDto.getAll(); // Retrieve all refueling records
        });
    }
    // Update a refueling record
    updateRefueling(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Perform validation using the updated validateRefuelingData method
                this.validateRefuelingData(data, true); // Validate updated data (using isUpdate = true)
                // Ensure the date is in ISO-8601 format if it's a string
                if (data.date && typeof data.date === 'string') {
                    data.date = new Date(data.date).toISOString(); // Format date to ISO-8601 string
                }
                // Perform the update in the database using RefuelingDto
                const updatedRefuel = yield refuelDto_js_1.RefuelingDto.update(id, data); // Call DTO method
                return updatedRefuel;
            }
            catch (error) {
                console.error("Error during refueling update:", error);
                throw error; // Re-throw for the controller to catch
            }
        });
    }
    // Delete a refueling record
    deleteRefueling(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return refuelDto_js_1.RefuelingDto.delete(id); // Delete refueling record
        });
    }
    // Validation logic for refueling data
    validateRefuelingData(data, isUpdate = false) {
        // If it's an update, some fields may be optional, but the others should still be validated.
        if (!isUpdate) {
            if (!data.date || !data.odometer || !data.kindOfFuel) {
                throw new Error('Date, odometer, and kind of fuel are required');
            }
            // General validation for fields
            if (data.odometer !== undefined) {
                const odometerValue = Number(data.odometer); // Convert to a number
                // Ensure odometer is a positive number
                if (typeof odometerValue !== 'number' || isNaN(odometerValue) || odometerValue <= 0) {
                    throw new Error('Odometer must be a positive number');
                }
                // Ensure the odometer value is stored as an integer (if required)
                data.odometer = Math.floor(odometerValue);
            }
            if (data.pricePerLiter !== undefined) {
                // Ensure data.pricePerLiter is a string before parsing
                const pricePerLiterValue = parseFloat(data.pricePerLiter.toString()); // Convert to number
                // Ensure pricePerLiter is a valid number and greater than zero
                if (isNaN(pricePerLiterValue) || pricePerLiterValue <= 0) {
                    throw new Error('Price per liter must be a positive number');
                }
                // Store the validated value as a float (number)
                data.pricePerLiter = pricePerLiterValue;
            }
            if (data.totalCost !== undefined) {
                // Ensure data.totalCost is a string before parsing
                const totalCostValue = parseFloat(data.totalCost.toString()); // Convert to number
                // Ensure totalCost is a valid number and greater than zero
                if (isNaN(totalCostValue) || totalCostValue <= 0) {
                    throw new Error('Total cost must be a positive number');
                }
                // Store the validated value as a float (number)
                data.totalCost = totalCostValue;
            }
            if (data.liters !== undefined) {
                // Ensure data.liters is a string before parsing
                const litersValue = parseFloat(data.liters.toString()); // Convert to number
                // Ensure liters is a valid number and greater than zero
                if (isNaN(litersValue) || litersValue <= 0) {
                    throw new Error('Liters must be a positive number');
                }
                // Store the validated value as a float (number)
                data.liters = litersValue; // No need to convert back to string
            }
            // You can add any other checks you may need, e.g., checking for correct formats of date, etc.
            if (data.date && typeof data.date === 'string' && isNaN(Date.parse(data.date))) {
                throw new Error('Date must be a valid ISO-8601 string');
            }
        }
    }
}
exports.RefuelingService = RefuelingService;
