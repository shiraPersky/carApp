import { ServiceDto } from '../dto/serviceDto';

export class ServiceService {
  // Create a new service with validation
  async createService(data: ServiceDto) {
    this.validateServiceData(data); // Call the private validation method .Throws error if data is invalid
    return await ServiceDto.create(data); // Call the DTO method
  }

  // Retrieve all services
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
        throw new Error('Car ID and Service Type are required');
      }
    }

    if (data.odometer !== undefined && data.odometer <= 0) {
      throw new Error('Odometer must be a positive number');
    }

    if (data.cost !== undefined && data.cost <= 0) {
      throw new Error('Cost must be a positive number');
    }

    if (data.reminder_kilometers !== undefined && data.reminder_kilometers <= 0) {
      throw new Error('Reminder kilometers must be a positive number');
    }

    if (data.reminder_months !== undefined && data.reminder_months <= 0) {
      throw new Error('Reminder months must be a positive number');
    }
  }
}
