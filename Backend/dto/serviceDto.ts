import { Prisma, PrismaClient } from '@prisma/client';

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
  license_plate!: string; 


  static async create(data: ServiceDto) {
    try {
      // Ensure license_plate is provided, if it's required by the Prisma schema
      if (!data.license_plate) {
        throw new Error("License plate is required.");
      }
  
      console.log("Creating service with data:", data);
  
      return await prisma.service.create({
        data: {
          ...data, // Spread the entire service data
          date: new Date(data.date), // Ensure date is valid
        },
      });
    } catch (error) {
      console.error("Error during service creation:", error);
  
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
  
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error("Prisma error code:", error.code);
        console.error("Prisma error meta:", error.meta);
      }
  
      throw new Error("Failed to create service");
    }
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

