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

  // Static method to create a new refueling record
  static async create(data: RefuelingDto) {
    return await prisma.refueling.create({ data });
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
        // Do not include `id` in the `data` object
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
