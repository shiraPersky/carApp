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
            this.validateRefuelingData(data, true); // Validate updated data
            return refuelDto_js_1.RefuelingDto.update(id, data); // Update refueling record
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
        if (!isUpdate) {
            if (!data.date || !data.odometer || !data.kindOfFuel) {
                throw new Error('Date, odometer, and kind of fuel are required');
            }
        }
        if (data.odometer !== undefined && data.odometer <= 0) {
            throw new Error('Odometer must be a positive number');
        }
        if (data.pricePerLiter !== undefined && data.pricePerLiter <= 0) {
            throw new Error('Price per liter must be a positive number');
        }
        if (data.totalCost !== undefined && data.totalCost <= 0) {
            throw new Error('Total cost must be a positive number');
        }
        if (data.liters !== undefined && data.liters <= 0) {
            throw new Error('Liters must be a positive number');
        }
    }
}
exports.RefuelingService = RefuelingService;
