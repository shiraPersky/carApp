"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefuelingDto = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class RefuelingDto {
    // Static method to create a new refueling record
    static async create(data) {
        return await prisma.refueling.create({ data });
    }
    // Static method to get all refueling records
    static async getAll() {
        return await prisma.refueling.findMany();
    }
    // Static method to update a specific refueling record
    static async update(id, data) {
        return await prisma.refueling.update({
            where: { id },
            data,
        });
    }
    // Static method to delete a refueling record
    static async delete(id) {
        return await prisma.refueling.delete({
            where: { id },
        });
    }
}
exports.RefuelingDto = RefuelingDto;
