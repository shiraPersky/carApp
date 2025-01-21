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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefuelingService = void 0;
var refuelDto_js_1 = require("../dto/refuelDto.js");
var add_carDto_js_1 = require("../dto/add_carDto.js");
var RefuelingService = /** @class */ (function () {
    function RefuelingService() {
    }
    // Create a new refueling record with validation
    RefuelingService.prototype.createRefueling = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedDate, refueling, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.validateRefuelingData(data); // Validate refueling data
                        // Ensure the date is in ISO-8601 format if it's a string
                        if (data.date && typeof data.date === 'string') {
                            parsedDate = new Date(data.date);
                            if (isNaN(parsedDate.getTime())) {
                                throw new Error('Date must be a valid ISO-8601 string');
                            }
                            data.date = parsedDate.toISOString(); // Format date to ISO-8601 string
                        }
                        // Ensure license_plate is valid
                        data.license_plate = data.license_plate || ""; // Set a default or validate
                        return [4 /*yield*/, refuelDto_js_1.RefuelingDto.create(data)];
                    case 1:
                        refueling = _a.sent();
                        // Update car's odometer after refueling
                        return [4 /*yield*/, add_carDto_js_1.CarDto.updateOdometer(data.license_plate, data.odometer)];
                    case 2:
                        // Update car's odometer after refueling
                        _a.sent();
                        return [2 /*return*/, refueling];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error during refueling creation:", error_1);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Retrieve all refueling records
    RefuelingService.prototype.getAllRefuelings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, refuelDto_js_1.RefuelingDto.getAll()]; // Retrieve all refueling records
            });
        });
    };
    // Update a refueling record
    RefuelingService.prototype.updateRefueling = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedDate, updatedRefuel, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        // Perform validation using the updated validateRefuelingData method
                        this.validateRefuelingData(data, true); // Validate updated data (using isUpdate = true)
                        // Ensure the date is in ISO-8601 format if it's a string
                        if (data.date && typeof data.date === 'string') {
                            parsedDate = new Date(data.date);
                            if (isNaN(parsedDate.getTime())) {
                                throw new Error('Date must be a valid ISO-8601 string');
                            }
                            data.date = parsedDate.toISOString(); // Format date to ISO-8601 string
                        }
                        // Update car's odometer after refueling
                        return [4 /*yield*/, add_carDto_js_1.CarDto.updateOdometer(data.license_plate, data.odometer)];
                    case 1:
                        // Update car's odometer after refueling
                        _a.sent();
                        return [4 /*yield*/, refuelDto_js_1.RefuelingDto.update(id, data)];
                    case 2:
                        updatedRefuel = _a.sent();
                        return [2 /*return*/, updatedRefuel];
                    case 3:
                        error_2 = _a.sent();
                        console.error("Error during refueling update:", error_2);
                        throw error_2; // Re-throw for the controller to catch
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Delete a refueling record
    RefuelingService.prototype.deleteRefueling = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, refuelDto_js_1.RefuelingDto.delete(id)]; // Delete refueling record
            });
        });
    };
    // Validation logic for refueling data
    RefuelingService.prototype.validateRefuelingData = function (data, isUpdate) {
        if (isUpdate === void 0) { isUpdate = false; }
        // If it's an update, some fields may be optional, but the others should still be validated.
        if (!isUpdate) {
            if (!data.date || !data.odometer || !data.kindOfFuel) {
                throw new Error('Date, odometer, and kind of fuel are required');
            }
        }
        // General validation for fields
        if (data.odometer !== undefined) {
            var odometerValue = Number(data.odometer); // Convert to a number
            // Ensure odometer is a positive number
            if (typeof odometerValue !== 'number' || isNaN(odometerValue) || odometerValue <= 0) {
                throw new Error('Odometer must be a positive number');
            }
            // Ensure the odometer value is stored as an integer (if required)
            data.odometer = Math.floor(odometerValue);
        }
        if (data.pricePerLiter !== undefined) {
            // Ensure data.pricePerLiter is a string before parsing
            var pricePerLiterValue = parseFloat(data.pricePerLiter.toString()); // Convert to number
            // Ensure pricePerLiter is a valid number and greater than zero
            if (isNaN(pricePerLiterValue) || pricePerLiterValue <= 0) {
                throw new Error('Price per liter must be a positive number');
            }
            // Store the validated value as a float (number)
            data.pricePerLiter = pricePerLiterValue;
        }
        if (data.totalCost !== undefined) {
            // Ensure data.totalCost is a string before parsing
            var totalCostValue = parseFloat(data.totalCost.toString()); // Convert to number
            // Ensure totalCost is a valid number and greater than zero
            if (isNaN(totalCostValue) || totalCostValue <= 0) {
                throw new Error('Total cost must be a positive number');
            }
            // Store the validated value as a float (number)
            data.totalCost = totalCostValue;
        }
        if (data.liters !== undefined) {
            // Ensure data.liters is a string before parsing
            var litersValue = parseFloat(data.liters.toString()); // Convert to number
            // Ensure liters is a valid number and greater than zero
            if (isNaN(litersValue) || litersValue <= 0) {
                throw new Error('Liters must be a positive number');
            }
            // Store the validated value as a float (number)
            data.liters = litersValue; // No need to convert back to string
        }
        // Date validation: Ensure the date is a valid ISO-8601 string
        if (data.date && typeof data.date === 'string') {
            var parsedDate = new Date(data.date);
            if (isNaN(parsedDate.getTime())) {
                throw new Error('Date must be a valid ISO-8601 string');
            }
        }
    };
    return RefuelingService;
}());
exports.RefuelingService = RefuelingService;
