import { RefuelingDto } from '../dto/refuelDto.js';

export class RefuelingService {
  // Create a new refueling record with validation
  async createRefueling(data: RefuelingDto) {
    try {
      this.validateRefuelingData(data); // Validate refueling data
      const refueling = await RefuelingDto.create(data); // Create refueling record
      return refueling;
    } catch (error) {
      console.error("Error during refueling creation:", error);
      throw error;
    }
  }

  // Retrieve all refueling records
  async getAllRefuelings() {
    return RefuelingDto.getAll(); // Retrieve all refueling records
  }

  // Update a refueling record
  async updateRefueling(id: number, data: Partial<RefuelingDto>) {
    this.validateRefuelingData(data, true); // Validate updated data
    return RefuelingDto.update(id, data); // Update refueling record
  }

  // Delete a refueling record
  async deleteRefueling(id: number) {
    return RefuelingDto.delete(id); // Delete refueling record
  }

  // Validation logic for refueling data
  private validateRefuelingData(data: Partial<RefuelingDto>, isUpdate = false) {
    if (!isUpdate) {
      if (!data.date || !data.odometer || !data.kindOfFuel) {
        throw new Error('Date, odometer, and kind of fuel are required');
      }
    }
  
    if (data.odometer !== undefined && data.odometer <= 0) {
      throw new Error('Odometer must be a positive number');
    }
  
    if (data.pricePerLiter !== undefined && data.pricePerLiter <= 0) {
      throw new Error('Price per liter must be a positive number');
    }
  
    if (data.totalCost !== undefined && data.totalCost <= 0) {
      throw new Error('Total cost must be a positive number');
    }
  
    if (data.liters !== undefined && data.liters <= 0) {
      throw new Error('Liters must be a positive number');
    }
  }
}
