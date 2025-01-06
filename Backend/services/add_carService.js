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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CarService {
    // Create a new car record
    createCar(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCar = yield prisma.car.create({
                    data: {
                        make: data.make,
                        model: data.model,
                        year: data.year,
                        license_plate: data.license_plate,
                        color: data.color,
                        odometer: data.odometer,
                        car_type: data.car_type,
                        fuel_type: data.fuel_type,
                        engine_number: data.engine_number,
                    },
                });
                return newCar;
            }
            catch (error) {
                throw new Error(`Failed to create car: ${error.message}`);
            }
        });
    }
    // Get all cars
    getAllCars() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.car.findMany();
        });
    }
    // Get a car by ID
    getCarById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.car.findUnique({
                where: { id },
            });
        });
    }
    // Update a car
    updateCar(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.car.update({
                where: { id },
                data,
            });
        });
    }
    // Delete a car
    deleteCar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.car.delete({
                where: { id },
            });
        });
    }
}
exports.CarService = CarService;
