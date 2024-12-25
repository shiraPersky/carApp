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
exports.CarDto = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CarDto {
    // Static method to create a new car record
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Map CarDto to the Prisma `CarCreateInput` type
            return yield prisma.car.create({
                data: {
                    license_plate: data.license_plate,
                    make: data.make,
                    model: data.model,
                    year: data.year,
                    color: data.color,
                    emission_group: data.emission_group,
                    valid_until: data.valid_until,
                    trim_level: data.trim_level,
                    last_test: data.last_test,
                    model_type: data.model_type,
                    model_number: data.model_number,
                },
            });
        });
    }
    // Static method to get all car records
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.car.findMany();
        });
    }
    // Static method to update a specific car record
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.car.update({
                where: { id },
                data: {
                    // Do not include `id` in the `data` object
                    license_plate: data.license_plate,
                    make: data.make,
                    model: data.model,
                    year: data.year,
                    color: data.color,
                    emission_group: data.emission_group,
                    valid_until: data.valid_until,
                    trim_level: data.trim_level,
                    last_test: data.last_test,
                    model_type: data.model_type,
                    model_number: data.model_number,
                    updated_at: new Date(), // Automatically update `updated_at`
                },
            });
        });
    }
    // Static method to delete a car record
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.car.delete({
                where: { id },
            });
        });
    }
}
exports.CarDto = CarDto;
