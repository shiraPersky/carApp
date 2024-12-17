import { ServiceDto } from '../dto/serviceDto.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export class ServiceService {  // Create a new service record
    
    // Create a new service with validation
  async createService(data: ServiceDto) {
    this.validateServiceData(data); // Call the private validation method .Throws error if data is invalid
    try {
      this.validateServiceData(data); // Validate service data
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
      this.validateServiceData(data, true); // Call the private validation method
      return ServiceDto.update(id, data); // Call the DTO method
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
  
    if (data.reminderKilometers !== undefined && data.reminderKilometers <= 0) {
      console.error("Validation failed: Invalid reminderKilometers value");
      throw new Error('Reminder kilometers must be a positive number');
    }
  
    if (data.reminderMonths !== undefined && data.reminderMonths <= 0) {
      console.error("Validation failed: Invalid reminderMonths value");
      throw new Error('Reminder months must be a positive number');
    }
  }
}  
