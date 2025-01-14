import { useForm } from 'react-hook-form';
import React from 'react';

const ReminderForm = ({ existingReminder, onSubmit }: any) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: existingReminder || {},
    });
  
    const handleFormSubmit = (data: any) => {
      // Ensure values are integers before submitting
      data.start_odometer = parseInt(data.start_odometer, 10);
      data.next_due_km = parseInt(data.next_due_km, 10);
      data.repeat_by_days = parseInt(data.repeat_by_days, 10);
      data.repeat_by_km = parseInt(data.repeat_by_km, 10);
      data.notify_before_days = parseInt(data.notify_before_days, 10);
      data.notify_before_km = parseInt(data.notify_before_km, 10);

      // Ensure start_date and due_date are in Date format (if needed)
      if (data.start_date) data.start_date = new Date(data.start_date);
      if (data.due_date) data.due_date = new Date(data.due_date);
    
      // Submit the data to the parent onSubmit function
      onSubmit(data);
    };
  
    return (
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* License Plate */}
        <div>
          <label>License Plate</label>
          <input 
            type="text" 
            {...register('license_plate', { required: 'License plate is required' })} 
          />
          {errors.license_plate && <span>{(errors.license_plate as any).message}</span>}
        </div>
        
        {/* Description */}
        <div>
          <label>Description</label>
          <input 
            type="text" 
            {...register('description', { required: 'Description is required' })} 
          />
          {errors.description && <span>{(errors.description as any).message}</span>}
        </div>
        
        {/* Start Date */}
        <div>
          <label>Start Date</label>
          <input 
            type="date" 
            {...register('start_date', { required: 'Start date is required' })} 
          />
          {errors.start_date && <span>{(errors.start_date as any).message}</span>}
        </div>
        
        {/* Start Odometer */}
        <div>
          <label>Start Odometer</label>
          <input 
            type="number" 
            {...register('start_odometer', { required: 'Start odometer is required' })} 
          />
          {errors.start_odometer && <span>{(errors.start_odometer as any).message}</span>}
        </div>
        
        {/* Due Date */}
        <div>
          <label>Due Date</label>
          <input 
            type="date" 
            {...register('due_date', { required: 'Due date is required' })} 
          />
          {errors.due_date && <span>{(errors.due_date as any).message}</span>}
        </div>
        
        {/* Next Due KM */}
        <div>
          <label>Next Due KM</label>
          <input 
            type="number" 
            {...register('next_due_km', { required: 'Next due KM is required' })} 
          />
          {errors.next_due_km && <span>{(errors.next_due_km as any).message}</span>}
        </div>
        
        {/* Repeat by Days */}
        <div>
          <label>Repeat by Days</label>
          <input 
            type="number" 
            {...register('repeat_by_days')} 
          />
        </div>
  
        {/* Repeat by KM */}
        <div>
          <label>Repeat by KM</label>
          <input 
            type="number" 
            {...register('repeat_by_km')} 
          />
        </div>
  
        {/* Notify Before Days */}
        <div>
          <label>Notify Before Days</label>
          <input 
            type="number" 
            {...register('notify_before_days')} 
          />
        </div>
  
        {/* Notify Before KM */}
        <div>
          <label>Notify Before KM</label>
          <input 
            type="number" 
            {...register('notify_before_km')} 
          />
        </div>
  
        {/* Completed */}
        <div>
          <label>Completed</label>
          <input 
            type="checkbox" 
            {...register('completed')} 
          />
        </div>
  
        <button type="submit">Save</button>
      </form>
    );
  };
  

export default ReminderForm;
