import { RefuelingDto } from '../dto/refuelDto.js';
import { CarDto } from '../dto/add_carDto.js';


export class RefuelingService {
  // Create a new refueling record with validation
  async createRefueling(data: RefuelingDto) {
    try {
      this.validateRefuelingData(data); // Validate refueling data

      // Ensure the date is in ISO-8601 format if it's a string
      if (data.date && typeof data.date === 'string') {
        const parsedDate = new Date(data.date);
        if (isNaN(parsedDate.getTime())) {
          throw new Error('Date must be a valid ISO-8601 string');
        }
        data.date = parsedDate.toISOString(); // Format date to ISO-8601 string
      }
      // Ensure license_plate is valid
      data.license_plate = data.license_plate || "";  // Set a default or validate

      const refueling = await RefuelingDto.create(data); // Create refueling record

      // Update car's odometer after refueling
      await CarDto.updateOdometer(data.license_plate, data.odometer);

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
    try {
      // Perform validation using the updated validateRefuelingData method
      this.validateRefuelingData(data, true); // Validate updated data (using isUpdate = true)
  
      // Ensure the date is in ISO-8601 format if it's a string
      if (data.date && typeof data.date === 'string') {
        const parsedDate = new Date(data.date);
        if (isNaN(parsedDate.getTime())) {
          throw new Error('Date must be a valid ISO-8601 string');
        }
        data.date = parsedDate.toISOString(); // Format date to ISO-8601 string
      }
       // Update car's odometer after refueling
       await CarDto.updateOdometer(data.license_plate, data.odometer);

  
      // Perform the update in the database using RefuelingDto
      const updatedRefuel = await RefuelingDto.update(id, data); // Call DTO method
      return updatedRefuel;
    } catch (error) {
      console.error("Error during refueling update:", error);
      throw error; // Re-throw for the controller to catch
    }
  }

  // Delete a refueling record
  async deleteRefueling(id: number) {
    return RefuelingDto.delete(id); // Delete refueling record
  }

  // Validation logic for refueling data
  private validateRefuelingData(data: Partial<RefuelingDto>, isUpdate = false) {
    // If it's an update, some fields may be optional, but the others should still be validated.
    if (!isUpdate) {
      if (!data.date || !data.odometer || !data.kindOfFuel) {
        throw new Error('Date, odometer, and kind of fuel are required');
      }
    }

    // General validation for fields
    if (data.odometer !== undefined) {
      const odometerValue = Number(data.odometer);  // Convert to a number

      // Ensure odometer is a positive number
      if (typeof odometerValue !== 'number' || isNaN(odometerValue) || odometerValue < 0) {
        throw new Error('Odometer must be a positive number');
      }

      // Ensure the odometer value is stored as an integer (if required)
      data.odometer = Math.floor(odometerValue);
    }

    if (data.pricePerLiter !== undefined) {
      // Ensure data.pricePerLiter is a string before parsing
      const pricePerLiterValue = parseFloat(data.pricePerLiter.toString()); // Convert to number
  
      // Ensure pricePerLiter is a valid number and greater than zero
      if (isNaN(pricePerLiterValue) || pricePerLiterValue <= 0) {
        throw new Error('Price per liter must be a positive number');
      }
  
      // Store the validated value as a float (number)
      data.pricePerLiter = pricePerLiterValue;  
    }
    
    if (data.totalCost !== undefined) {
      // Ensure data.totalCost is a string before parsing
      const totalCostValue = parseFloat(data.totalCost.toString()); // Convert to number
  
      // Ensure totalCost is a valid number and greater than zero
      if (isNaN(totalCostValue) || totalCostValue <= 0) {
        throw new Error('Total cost must be a positive number');
      }
  
      // Store the validated value as a float (number)
      data.totalCost = totalCostValue; 
    }
  
    if (data.liters !== undefined) {
      // Ensure data.liters is a string before parsing
      const litersValue = parseFloat(data.liters.toString()); // Convert to number
  
      // Ensure liters is a valid number and greater than zero
      if (isNaN(litersValue) || litersValue <= 0) {
        throw new Error('Liters must be a positive number');
      }
  
      // Store the validated value as a float (number)
      data.liters = litersValue;  // No need to convert back to string
    }

    // Date validation: Ensure the date is a valid ISO-8601 string
    if (data.date && typeof data.date === 'string') {
      const parsedDate = new Date(data.date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Date must be a valid ISO-8601 string');
      }
    }
  }
}
