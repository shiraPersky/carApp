import { useForm } from 'react-hook-form';
import React from 'react';

const CarForm = ({ existingCar, onSubmit }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: existingCar || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* License Plate */}
      <div>
        <label>License Plate</label>
        <input 
          type="text" 
          {...register('license_plate', { required: 'License plate is required' })} 
        />
        {errors.license_plate && <span>{(errors.license_plate as any).message}</span>}
      </div>

      {/* Make */}
      <div>
        <label>Make</label>
        <input 
          type="text" 
          {...register('make', { required: 'Make is required' })} 
        />
        {errors.make && <span>{(errors.make as any).message}</span>}
      </div>

      {/* Model */}
      <div>
        <label>Model</label>
        <input 
          type="text" 
          {...register('model', { required: 'Model is required' })} 
        />
        {errors.model && <span>{(errors.model as any).message}</span>}
      </div>

      {/* Year */}
      <div>
        <label>Year</label>
        <input 
          type="number" 
          {...register('year', { required: 'Year is required' })} 
        />
        {errors.year && <span>{(errors.year as any).message}</span>}
      </div>

      {/* Color */}
      <div>
        <label>Color</label>
        <input 
          type="text" 
          {...register('color', { required: 'Color is required' })} 
        />
        {errors.color && <span>{(errors.color as any).message}</span>}
      </div>

      {/* Emission Group */}
      <div>
        <label>Emission Group</label>
        <input 
          type="text" 
          {...register('emission_group')} 
        />
      </div>

      {/* Valid Until */}
      <div>
        <label>Valid Until</label>
        <input 
          type="date" 
          {...register('valid_until', { required: 'Validity date is required' })} 
        />
        {errors.valid_until && <span>{(errors.valid_until as any).message}</span>}
      </div>

      {/* Trim Level */}
      <div>
        <label>Trim Level</label>
        <input 
          type="text" 
          {...register('trim_level')} 
        />
      </div>

      {/* Last Test */}
      <div>
        <label>Last Test</label>
        <input 
          type="date" 
          {...register('last_test', { required: 'Last test date is required' })} 
        />
        {errors.last_test && <span>{(errors.last_test as any).message}</span>}
      </div>

      {/* Model Type */}
      <div>
        <label>Model Type</label>
        <select {...register('model_type', { required: 'Model type is required' })}>
          <option value="">Select Model Type</option>
          <option value="private">Private</option>
          <option value="commercial">Commercial</option>
        </select>
        {errors.model_type && <span>{(errors.model_type as any).message}</span>}
      </div>

      {/* Model Number */}
      <div>
        <label>Model Number</label>
        <input 
          type="text" 
          {...register('model_number', { required: 'Model number is required' })} 
        />
        {errors.model_number && <span>{(errors.model_number as any).message}</span>}
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default CarForm;
