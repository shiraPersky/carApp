import { useForm } from 'react-hook-form';
import React from 'react';

const fuelTypes = [
  "95 Octane (Regular Gasoline)", "98 Octane (Premium Gasoline)", "Electric", "Hybrid", "Diesel "
];

const RefuelingForm = ({ existingRefuel, onSubmit }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: existingRefuel || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Car ID */}
       {/* License Plate */}
       <div>
        <label>License Plate</label>
        <input 
          type="text" 
          {...register('license_plate', { required: 'License plate is required' })} 
        />
      </div>
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
        <label>Kind of Fuel</label>
        <select {...register('kindOfFuel', { required: 'Kind of fuel is required' })}>
          <option value="">Select a fuel type</option>
          {fuelTypes.map((fuel, index) => (
            <option key={index} value={fuel}>
              {fuel}
            </option>
          ))}
        </select>
        {errors.kindOfFuel && <span>{(errors.kindOfFuel as any).message}</span>} 
      </div>
      <div>
        <label>Price per Liter</label>
        <input 
          type="number" 
          step="0.01" 
          {...register('pricePerLiter', { required: 'Price per liter is required' })} 
        />
        {errors.pricePerLiter && <span>{(errors.pricePerLiter as any).message}</span>}
      </div>
      <div>
        <label>Total Cost</label>
        <input 
          type="number" 
          step="0.01" 
          {...register('totalCost', { required: 'Total cost is required' })} 
        />
        {errors.totalCost && <span>{(errors.totalCost as any).message}</span>}
      </div>
      <div>
        <label>Liters</label>
        <input 
          type="number" 
          step="0.01" 
          {...register('liters', { required: 'Liters is required' })} 
        />
        {errors.liters && <span>{(errors.liters as any).message}</span>}
      </div>
      <div>
        <label>Gas Station</label>
        <input {...register('gasStation')} />
      </div>
      <div>
        <label>Driver</label>
        <input {...register('driver')} />
      </div>
      <div>
        <label>Notes</label>
        <textarea {...register('notes')} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default RefuelingForm;
