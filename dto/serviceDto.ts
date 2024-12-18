import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ServiceDto {
  car_id!: number;
  date!: string;
  time!: string;
  odometer!: number;
  service_type!: string;
  place!: string;
  driver!: string;
  paymentMethod!: string; 
  file_attachment?: string;
  cost!: number;
  notes?: string;


  // Static method to create a new service record
  static async create(data: ServiceDto) {
    const services = await prisma.service.findMany();
    console.log(services); // Log the fetched services to ensure all fields are included
    return services;
  }

  // Static method to get all service records
  static async getAll() {
    return await prisma.service.findMany();
  }

  // Static method to update a specific service record
  static async update(id: number, data: Partial<ServiceDto>) {
    try {
      console.log("Updating service with id:", id, "and data:", data); // Log inputs
      return await prisma.service.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error("Error updating service in Prisma:", error); // Log Prisma error
      throw error; // Re-throw for the service layer to catch
    }
  }
  

  // Static method to delete a service record
  static async delete(id: number) {
    return await prisma.service.delete({
      where: { id },
    });
  }
}
