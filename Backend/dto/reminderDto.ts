import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ReminderDto {
  license_plate!: string;
  description!: string;
  due_date?: Date;
  next_due_km?: number;
  repeat_by_days?: number;
  repeat_by_km?: number;
  notify_before_days?: number;
  notify_before_km?: number;
  completed: boolean = false;

  static async create(data: ReminderDto) {
    try {
      // Ensure required fields are provided
      if (!data.license_plate) {
        throw new Error("License plate is required.");
      }
      if (!data.description) {
        throw new Error("Description is required.");
      }

      console.log("Creating reminder with data:", data);

      return await prisma.reminder.create({
        data: {
          ...data, // Spread the entire reminder data
          due_date: data.due_date ? new Date(data.due_date) : null, // Ensure date is valid
        },
      });
    } catch (error) {
      console.error("Error during reminder creation:", error);

      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error("Prisma error code:", error.code);
        console.error("Prisma error meta:", error.meta);
      }

      throw new Error("Failed to create reminder");
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
