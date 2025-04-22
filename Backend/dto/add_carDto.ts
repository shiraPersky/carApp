import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export class CarDto {
  license_plate!: string;
  make!: string;
  model!: string;
  year!: number;
  color!: string;
  emission_group?: string;
  valid_until!: Date;
  trim_level?: string;
  last_test!: Date;
  model_type!: string;
  model_number!: string;
  odometer?: number;

  // Static method to create a new car record
  static async create(data: CarDto) {
    // Map CarDto to the Prisma `CarCreateInput` type
    return await prisma.car.create({
      data: {
        license_plate: data.license_plate,
        make: data.make,
        model: data.model,
        year: data.year,
        color: data.color,
        emission_group: data.emission_group,
        valid_until: data.valid_until,
        trim_level: data.trim_level,
        last_test: data.last_test,
        model_type: data.model_type,
        model_number: data.model_number,
        ...(data.odometer !== undefined && { odometer: data.odometer }), // Only include odometer if provided
      },
    });
  }

  // Static method to get all car records
  static async getAll() {
    return await prisma.car.findMany();
  }

  static async findByLicensePlate(licensePlate: string) {
    return await prisma.car.findUnique({
      where: { license_plate: licensePlate },
    });
  }  

  // Static method to update a specific car record
  static async update(id: number, data: Partial<CarDto>) {
    return await prisma.car.update({
      where: { id },
      data: {
        // Do not include `id` in the `data` object
        license_plate: data.license_plate,
        make: data.make,
        model: data.model,
        year: data.year,
        color: data.color,
        emission_group: data.emission_group,
        valid_until: data.valid_until,
        trim_level: data.trim_level,
        last_test: data.last_test,
        model_type: data.model_type,
        model_number: data.model_number,
        updated_at: new Date(), // Automatically update `updated_at`
      },
    });
  }

  // Static method to delete a car record
  static async delete(id: number) {
    return await prisma.car.delete({
      where: { id },
    });
  }

  //  // Static method to update the car's odometer
  //  static async updateOdometer(licensePlate: string, odometer: number) {
  //   return await prisma.car.update({
  //     where: { license_plate: licensePlate },
  //     data: {
  //       odometer: odometer,  
  //     } as Prisma.CarUpdateInput,  // Explicitly cast to Prisma.CarUpdateInput
  //   });
  // }
  static async updateOdometer(licensePlate: string, odometer: number) {
    // Check if a car with the given license plate exists
    const car = await prisma.car.findUnique({
      where: { license_plate: licensePlate },
    });
  
    if (!car) {
      // Throw an error with a message that can be caught on the frontend
      throw new Error(`Car with license plate "${licensePlate}" does not exist`);
    }
  
    // Proceed with the odometer update
    return await prisma.car.update({
      where: { license_plate: licensePlate },
      data: {
        odometer: odometer,
      } as Prisma.CarUpdateInput,
    });
  }
  
  
}
