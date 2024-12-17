//DTO to define the Service object

export interface ServiceDto {
    id?: number;
    car_id: number;
    date: string;
    time: string;
    odometer: number;
    service_type: string;
    place: string;
    driver: string;
    paymentMethod: string;
    file_attachment?: string;
    cost: number;
    notes?: string;
    reminderKilometers?: number;
    reminderMonths?: number;
  }
  