import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class OdometerService {
  // Method to update the car's odometer by license plate
  static async updateOdometer(licensePlate: string, odometer: number) {
    try {
      // Update the odometer in the database
      const updatedCar = await prisma.car.update({
        where: { license_plate: licensePlate },
        data: {
          odometer: odometer,
        },
      });

      return updatedCar;
    } catch (error) {
      throw new Error(`Error updating odometer for car ${licensePlate}: ${error.message}`);
    }
  }
}
