import { useForm } from 'react-hook-form';
import React from 'react';

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
        <input {...register('service_type', { required: 'Service type is required' })} />
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
