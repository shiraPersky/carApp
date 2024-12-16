import { ServiceDto } from '../dto/serviceDto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export class ServiceService {  // Create a new service record
    
    async createService(data: ServiceDto) {//this function take data type:serviceDto
      // Validate input data
      this.validateServiceData(data);
     

        // Create service record in the database using Prisma
        try{
            const newService = await prisma.service.create({
                data: {
                car_id: data.car_id,             //(must)
                service_type: data.service_type, // Type of service(must)
                date: new Date(data.date),     // Date of the service
                time: data.time,               // Time of the service
                odometer: data.odometer,       // Odometer reading
                place: data.place,             // Place of service
                driver: data.driver,           // Driver's name or ID
                paymentMethod: data.payment_method, // Payment method used
                cost: data.cost,               // Cost of the service
                notes: data.notes,             // Additional notes
                file_attachment: data.file_attachment,   // (file)
                reminderKilometers: data.reminder_kilometers, // Reminder (in kilometers)
                reminderMonths: data.reminder_months,         // Reminder (in months)
                },
            });
            return newService;
        }
        catch(error){
            throw new Error(`Failed to create service: ${(error as Error).message}`);  
        }  
    }

    // Validation logic for service data
    private validateServiceData(data: ServiceDto) {
        if (!data.service_type || !data.car_id) {
        throw new Error('Car ID and Service Type are required');
        }

        if (data.odometer && data.odometer <= 0) {
        throw new Error('Odometer must be a positive number');
        }

        if (data.cost && data.cost <= 0) {
        throw new Error('Cost must be a positive number');
        }

        if (data.reminder_kilometers && data.reminder_kilometers <= 0) {
        throw new Error('Reminder kilometers must be a positive number');
        }

        if (data.reminder_months && data.reminder_months <= 0) {
        throw new Error('Reminder months must be a positive number');
        }
    }

  
    async getAllServices() {
      // Simulate getting all services from the database
      return [{ id: 1, type: 'Oil Change' }, { id: 2, type: 'Brake Check' }];
    }
  
    async updateService(id: number, data: any) {
      // Simulate updating a service
      return { id, ...data };
    }
  
    async deleteService(id: number) {
      // Simulate deleting a service
      return { id };
    }
  }
  