import { PrismaClient } from '@prisma/client';
import { CarDto } from '../dto/add_carDto';

const prisma = new PrismaClient();

export class CarService {
  // Create a new car record
  async createCar(data: CarDto) {
    try {
      const newCar = await prisma.car.create({
        data: {
          make: data.make,
          model: data.model,
          year: data.year,
          license_plate: data.license_plate,
          color: data.color,
          odometer: data.odometer,
          car_type: data.car_type,
          fuel_type: data.fuel_type,
          engine_number: data.engine_number,
        },
      });
      return newCar;
    } catch (error) {
      throw new Error(`Failed to create car: ${(error as Error).message}`);
    }
  }

  // Get all cars
  async getAllCars() {
    return await prisma.car.findMany();
  }

  // Get a car by ID
  async getCarById(id: number) {
    return await prisma.car.findUnique({
      where: { id },
    });
  }

  // Update a car
  async updateCar(id: number, data: CarDto) {
    return await prisma.car.update({
      where: { id },
      data,
    });
  }

  // Delete a car
  async deleteCar(id: number) {
    return await prisma.car.delete({
      where: { id },
    });
  }
}
