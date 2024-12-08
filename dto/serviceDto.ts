import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ServiceDto {
  // Instance properties (non-static)
  car_id: number;
  date: string;
  time: string;
  odometer: number;
  service_type: string;
  place: string;
  driver: string;
  payment_method: string;
  file_attachment?: string;
  cost: number;
  notes?: string;
  reminder_kilometers?: number;
  reminder_months?: number;

  // Static method to create a new service record
  static async create(data: ServiceDto) {
    return await prisma.service.create({ data });
  }

  // Static method to get all service records
  static async getAll() {
    return await prisma.service.findMany();
  }

  // Static method to update a specific service record
  static async update(id: number, data: Partial<ServiceDto>) {
    return await prisma.service.update({
      where: { id },
      data,
    });
  }

  // Static method to delete a service record
  static async delete(id: number) {
    return await prisma.service.delete({
      where: { id },
    });
  }
}
