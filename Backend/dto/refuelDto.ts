import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RefuelingDto {
  date!: string;
  time!: string;
  odometer!: number;
  kindOfFuel!: string;
  pricePerLiter!: number;
  totalCost!: number;
  liters!: number;
  gasStation!: string;
  driver!: string;
  fileAttachment?: string;
  notes?: string;
  license_plate?: string; 


    // Static method to create a new refueling record
    static async create(data: RefuelingDto) {
      // Ensure license_plate is provided, as it is required by Prisma
      if (!data.license_plate) {
        throw new Error("License plate is required.");
      }
  
      // Map the RefuelingDto to the RefuelingCreateInput type
      const refuelingData = {
        date: new Date(data.date),
        time: data.time,
        odometer: data.odometer,
        kindOfFuel: data.kindOfFuel,
        pricePerLiter: data.pricePerLiter,
        totalCost: data.totalCost,
        liters: data.liters,
        gasStation: data.gasStation,
        driver: data.driver,
        fileAttachment: data.fileAttachment,
        notes: data.notes,
        license_plate: data.license_plate,  // required
      };
  
      return await prisma.refueling.create({
        data: refuelingData,
      });
    }
  

  // Static method to get all refueling records
  static async getAll() {
    return await prisma.refueling.findMany();
  }

  // Static method to update a specific refueling record
  static async update(id: number, data: Partial<RefuelingDto>) {
    return await prisma.refueling.update({
      where: { id },
      data: {
        date: data.date,
        time: data.time,
        odometer: data.odometer,
        kindOfFuel: data.kindOfFuel,
        pricePerLiter: data.pricePerLiter,
        totalCost: data.totalCost,
        liters: data.liters,
        gasStation: data.gasStation,
        driver: data.driver,
        fileAttachment: data.fileAttachment,
        notes: data.notes,
        updatedAt: new Date().toISOString(), // Automatically update `updatedAt`
        license_plate: data.license_plate,

      },
    });
  }

  // Static method to delete a refueling record
  static async delete(id: number) {
    return await prisma.refueling.delete({
      where: { id },
    });
  }
}
