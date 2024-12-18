import { ServiceDto } from '../dto/serviceDto.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ServiceService {
  // Create a new service with validation
  async createService(data: ServiceDto) {
    this.validateServiceData(data); // Call the private validation method. Throws error if data is invalid
    try {
      // Perform type casting before creating the service
      data.car_id = parseInt(data.car_id as unknown as string, 10); // Ensure car_id is an integer
      data.odometer = parseInt(data.odometer as unknown as string, 10); // Ensure odometer is an integer
      data.cost = parseFloat(data.cost as unknown as string); // Ensure cost is a float

      // Ensure date is a valid Date object or ISO-8601 string
      if (typeof data.date === 'string') {
        data.date = new Date(data.date).toISOString(); // Convert to ISO-8601 string if it's a string
      }

      const service = await ServiceDto.create(data); // Attempt to create service
      return service;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during service creation:", error.message); // Log specific error message
      } else {
        console.error("An unknown error occurred:", error); // Log the unknown error
      }
      throw error; // Rethrow error to be caught by controller
    }
  }

    async getAllServices() {
      return ServiceDto.getAll(); // Call the DTO method
    }

    
    // Update a service with validation
    async updateService(id: number, data: Partial<ServiceDto>) {
      try {
        // Perform type casting before creating the service
        data.car_id = parseInt(data.car_id as unknown as string, 10); // Ensure car_id is an integer
        data.odometer = parseInt(data.odometer as unknown as string, 10); // Ensure odometer is an integer
        data.cost = parseFloat(data.cost as unknown as string); // Ensure cost is a float

        // Ensure the date is in ISO-8601 format if it's a string
        if (data.date && typeof data.date === 'string') {
          data.date = new Date(data.date).toISOString(); // Format date to ISO-8601 string
        }
  
        // Validate data before updating
        this.validateServiceData(data, true); // Validation
  
        // Update service in the database
        const updatedService = await ServiceDto.update(id, data); // Call DTO method
        return updatedService;
      } catch (error) {
        console.error("Error in updateService:", error); // Log the error
        throw error; // Re-throw for the controller to catch
      }
    }
  
  
    // Delete a service
    async deleteService(id: number) {
      return ServiceDto.delete(id); // Call the DTO method
    }
  


  // Validation logic for service data
  private validateServiceData(data: Partial<ServiceDto>, isUpdate = false) {
    if (!isUpdate) {
      if (!data.service_type || !data.car_id) {
        console.error("Validation failed: Missing service_type or car_id");
        throw new Error('Car ID and Service Type are required');
      }
    }
  
    if (data.odometer !== undefined && data.odometer <= 0) {
      console.error("Validation failed: Invalid odometer value");
      throw new Error('Odometer must be a positive number');
    }
  
    if (data.cost !== undefined && data.cost <= 0) {
      console.error("Validation failed: Invalid cost value");
      throw new Error('Cost must be a positive number');
    }
  
  }
}  
