import { useForm } from 'react-hook-form';
import React from 'react';

const serviceTypes = [
  "Air conditioning", "Air filter", "Battery", "Belts", "Brake fluid", "Brake pad", 
  "Car wash", "Fuel filter", "Inspection", "Labor cost", "Lights", "New tires", 
  "Oil change", "Oil filter", "Rotate tires", "Suspension system", "Tire pressure", 
  "Wheel alignment", "Engine oil", "Spark plugs", "Change Tires", "Coolant", 
  "Turn signals", "Parking lights", "Windshields wipers"
];

const ServiceForm = ({ existingService, onSubmit }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: existingService || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Date</label>
        <input type="date" {...register('date', { required: 'Date is required' })} />
      </div>
      <div>
        <label>Time</label>
        <input type="time" {...register('time', { required: 'Time is required' })} />
      </div>
      <div>
        <label>Odometer</label>
        <input type="number" {...register('odometer', { required: 'Odometer is required' })} />
      </div>
      <div>
      <label>Service Type</label>
        <select {...register('service_type', { required: 'Service type is required' })}>
          <option value="">Select a service</option>
          {serviceTypes.map((service, index) => (
            <option key={index} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service_type && <span>{(errors.service_type as any).message}</span>} 
        </div>
      <div>
        <label>Place</label>
        <input {...register('place')} />
      </div>
      <div>
        <label>Driver</label>
        <input {...register('driver')} />
      </div>
      <div>
        <label>Payment Method</label>
        <input {...register('payment_method')} />
      </div>
      <div>
        <label>Cost</label>
        <input type="number" {...register('cost', { required: 'Cost is required' })} />
      </div>
      <div>
        <label>Notes</label>
        <textarea {...register('notes')} />
      </div>
      <div>
        <label>Reminder</label>
        <input {...register('reminder')} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default ServiceForm;
