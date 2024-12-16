"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceDto = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ServiceDto {
    // Static method to create a new service record
    static async create(data) {
        return await prisma.service.create({ data });
    }
    // Static method to get all service records
    static async getAll() {
        return await prisma.service.findMany();
    }
    // Static method to update a specific service record
    static async update(id, data) {
        return await prisma.service.update({
            where: { id },
            data,
        });
    }
    // Static method to delete a service record
    static async delete(id) {
        return await prisma.service.delete({
            where: { id },
        });
    }
}
exports.ServiceDto = ServiceDto;
