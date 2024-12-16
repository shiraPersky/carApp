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
exports.ServiceService = void 0;
var serviceDto_js_1 = require("../dto/serviceDto.js");
var ServiceService = /** @class */ (function () {
    function ServiceService() {
    }
    // Create a new service with validation
    ServiceService.prototype.createService = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var service, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.validateServiceData(data); // Validate service data
                        return [4 /*yield*/, serviceDto_js_1.ServiceDto.create(data)];
                    case 1:
                        service = _a.sent();
                        return [2 /*return*/, service];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1 instanceof Error) {
                            console.error("Error during service creation:", error_1.message); // Log specific error message
                        }
                        else {
                            console.error("An unknown error occurred:", error_1); // Log the unknown error
                        }
                        throw error_1; // Rethrow error to be caught by controller
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Retrieve all services
    ServiceService.prototype.getAllServices = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, serviceDto_js_1.ServiceDto.getAll()]; // Call the DTO method
            });
        });
    };
    // Update a service with validation
    ServiceService.prototype.updateService = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.validateServiceData(data, true); // Call the private validation method
                return [2 /*return*/, serviceDto_js_1.ServiceDto.update(id, data)]; // Call the DTO method
            });
        });
    };
    // Delete a service
    ServiceService.prototype.deleteService = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, serviceDto_js_1.ServiceDto.delete(id)]; // Call the DTO method
            });
        });
    };
    // Validation logic for service data
    ServiceService.prototype.validateServiceData = function (data, isUpdate) {
        if (isUpdate === void 0) { isUpdate = false; }
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
        if (data.reminderKilometers !== undefined && data.reminderKilometers <= 0) {
            console.error("Validation failed: Invalid reminderKilometers value");
            throw new Error('Reminder kilometers must be a positive number');
        }
        if (data.reminderMonths !== undefined && data.reminderMonths <= 0) {
            console.error("Validation failed: Invalid reminderMonths value");
            throw new Error('Reminder months must be a positive number');
        }
    };
    return ServiceService;
}());
exports.ServiceService = ServiceService;
