import { CarDto } from '../dto/add_carDto.js';

export class CarService {
  // Create a new car record with validation
  async createCar(data: CarDto) {
    try {
      this.validateCarData(data); // Validate car data

      // Ensure the dates are valid and in ISO-8601 format if they're strings
      if (data.valid_until && typeof data.valid_until === 'string') {
        if (isNaN(Date.parse(data.valid_until))) {
          throw new Error('Valid until must be a valid ISO-8601 date');
        }
        data.valid_until = new Date(data.valid_until); // Convert to Date object
      }
      if (data.last_test && typeof data.last_test === 'string') {
        if (isNaN(Date.parse(data.last_test))) {
          throw new Error('Last test must be a valid ISO-8601 date');
        }
        data.last_test = new Date(data.last_test); // Convert to Date object
      }

      // Convert emission_group to a string if it is not null
      if (data.emission_group !== undefined && data.emission_group !== null) {
        data.emission_group = String(data.emission_group);
      }

      // Convert model_number to a string if it is not null
      if (data.model_number !== undefined && data.model_number !== null) {
        data.model_number = String(data.model_number);
      }

      // Log and inspect the data to ensure valid values before passing to Prisma
      console.log('Prepared Car Data:', data);

      const car = await CarDto.create(data); // Create car record
      return car;
    } catch (error) {
      console.error('Error during car creation:', error);
      throw error;
    }
  }

  // Retrieve all car records
  async getAllCars() {
    return CarDto.getAll(); // Retrieve all car records
  }

  // Update a car record
  async updateCar(id: number, data: Partial<CarDto>) {
    try {
      this.validateCarData(data, true); // Validate updated data (isUpdate = true)

      // Ensure the dates are valid and in ISO-8601 format if they're strings
      if (data.valid_until && typeof data.valid_until === 'string') {
        if (isNaN(Date.parse(data.valid_until))) {
          throw new Error('Valid until must be a valid ISO-8601 date');
        }
        data.valid_until = new Date(data.valid_until); // Convert to Date object
      }
      if (data.last_test && typeof data.last_test === 'string') {
        if (isNaN(Date.parse(data.last_test))) {
          throw new Error('Last test must be a valid ISO-8601 date');
        }
        data.last_test = new Date(data.last_test); // Convert to Date object
      }

      // Convert emission_group to a string if it is not null
      if (data.emission_group !== undefined && data.emission_group !== null) {
        data.emission_group = String(data.emission_group);
      }

      // Convert model_number to a string if it is not null
      if (data.model_number !== undefined && data.model_number !== null) {
        data.model_number = String(data.model_number);
      }

      // Log and inspect the data to ensure valid values before passing to Prisma
      console.log('Updated Car Data:', data);

      const updatedCar = await CarDto.update(id, data); // Update car record
      return updatedCar;
    } catch (error) {
      console.error('Error during car update:', error);
      throw error;
    }
  }

  // Delete a car record
  async deleteCar(id: number) {
    return CarDto.delete(id); // Delete car record
  }

  // Validation logic for car data
  private validateCarData(data: Partial<CarDto>, isUpdate = false) {
    if (!isUpdate) {
      if (!data.license_plate || !data.make || !data.model || !data.year || !data.color || !data.valid_until || !data.last_test || !data.model_type || !data.model_number) {
        throw new Error('Required fields are missing: license_plate, make, model, year, color, valid_until, last_test, model_type, model_number');
      }
    }

    if (data.year !== undefined) {
      const yearValue = Number(data.year);
      if (isNaN(yearValue) || yearValue <= 0) {
        throw new Error('Year must be a positive number');
      }
      data.year = yearValue;
    }

    if (data.valid_until && isNaN(Date.parse(data.valid_until.toString()))) {
      throw new Error('Valid until must be a valid ISO-8601 date');
    }
    if (data.last_test && isNaN(Date.parse(data.last_test.toString()))) {
      throw new Error('Last test must be a valid ISO-8601 date');
    }
  }
}
