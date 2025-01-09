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
exports.OdometerService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class OdometerService {
    // Method to update the car's odometer by license plate
    static updateOdometer(licensePlate, odometer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Update the odometer in the database
                const updatedCar = yield prisma.car.update({
                    where: { license_plate: licensePlate },
                    data: {
                        odometer: odometer,
                    },
                });
                return updatedCar;
            }
            catch (error) {
                throw new Error(`Error updating odometer for car ${licensePlate}: ${error.message}`);
            }
        });
    }
}
exports.OdometerService = OdometerService;
