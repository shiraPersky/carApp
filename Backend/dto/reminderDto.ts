import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ReminderDto {
  license_plate!: string;
  description!: string;
  start_date?: Date;
  start_odometer?: number;
  due_date?: Date;
  next_due_km?: number;
  repeat_by_days?: number;
  repeat_by_km?: number;
  notify_before_days?: number;
  notify_before_km?: number;
  completed: boolean = false;

  static async create(data: ReminderDto) {
    try {
      // Validate data
      if (!data.license_plate || !data.description) {
        throw new Error('License plate and description are required');
      }
  
      // Log the data
      console.log("Creating reminder with data:", data);
  
      return await prisma.reminder.create({
        data: {
          ...data,
          due_date: data.due_date ? new Date(data.due_date) : null,
          start_date: data.start_date ? new Date(data.start_date) : null, // Handle start date
          start_odometer: data.start_odometer, // Handle start odometer
        },
      });
    } catch (error) {
      console.error("Error during reminder creation:", error);
      throw error;
    }
  }
  

  // Static method to get all reminders
  static async getAll() {
    return await prisma.reminder.findMany();
  }

  // Static method to update a specific reminder
  static async update(id: number, data: Partial<ReminderDto>) {
    try {
      console.log("Updating reminder with id:", id, "and data:", data); // Log inputs
      return await prisma.reminder.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error("Error updating reminder in Prisma:", error); // Log Prisma error
      throw error; // Re-throw for the service layer to catch
    }
  }

  // Static method to delete a reminder
  static async delete(id: number) {
    return await prisma.reminder.delete({
      where: { id },
    });
  }
}
