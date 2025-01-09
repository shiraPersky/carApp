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
exports.ServiceDto = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ServiceDto {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Ensure license_plate is provided, if it's required by the Prisma schema
                if (!data.license_plate) {
                    throw new Error("License plate is required.");
                }
                console.log("Creating service with data:", data);
                return yield prisma.service.create({
                    data: Object.assign(Object.assign({}, data), { date: new Date(data.date) }),
                });
            }
            catch (error) {
                console.error("Error during service creation:", error);
                if (error instanceof Error) {
                    console.error("Error message:", error.message);
                    console.error("Error stack:", error.stack);
                }
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    console.error("Prisma error code:", error.code);
                    console.error("Prisma error meta:", error.meta);
                }
                throw new Error("Failed to create service");
            }
        });
    }
    // Static method to get all service records
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.service.findMany();
        });
    }
    // Static method to update a specific service record
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Updating service with id:", id, "and data:", data); // Log inputs
                return yield prisma.service.update({
                    where: { id },
                    data,
                });
            }
            catch (error) {
                console.error("Error updating service in Prisma:", error); // Log Prisma error
                throw error; // Re-throw for the service layer to catch
            }
        });
    }
    // Static method to delete a service record
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.service.delete({
                where: { id },
            });
        });
    }
}
exports.ServiceDto = ServiceDto;
