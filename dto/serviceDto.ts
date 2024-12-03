export interface ServiceDto {
    car_id: number;              // Foreign Key to Cars table
    date: string;                // Service date
    time: string;                // Service time
    odometer: number;            // Odometer reading
    service_type: string;        // Type of service
    place: string;               // Service location
    driver: string;              // Driver's name
    payment_method: string;      // Payment method
    file_attachment?: string;    // URL of file attachment
    cost: number;                // Service cost
    notes?: string;              // Additional notes 
    reminder_kilometers?: number;// Reminder in kilometers 
    reminder_months?: number;    // Reminder in months 
  }
  