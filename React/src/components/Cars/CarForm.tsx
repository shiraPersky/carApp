// import { useForm } from 'react-hook-form';
// import React, { useState } from 'react';
// import axios from 'axios';

// // Define the expected structure of the car details response
// type CarDetails = {
//   make: string;
//   model: string;
//   year: string;
//   color: string;
//   emission_group: string;
//   valid_until: string;
//   trim_level: string;
//   last_test: string;
//   model_type: string;
//   model_number: string;
// };

// const CarForm = ({ existingCar, onSubmit }: any) => {
//   const [isLoading, setIsLoading] = useState(false); // Loading state for auto-fill
//   const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
//     defaultValues: existingCar || {},
//   });

//   const handleAutoFillFromLicensePlate = async () => {
//     const licensePlate = getValues('license_plate');
//     if (!licensePlate) {
//       alert('Please enter a license plate to auto-fill the form.');
//       return;
//     }

//     try {
//       setIsLoading(true);

//       // Use the CarDetails type for the response
//       const response = await axios.get<{ car: CarDetails }>(`http://localhost:3000/csv/search/${licensePlate}`);
//       const carDetails = response.data.car; // Type is now inferred correctly

//       if (carDetails) {
//         // Set each field's value in the form
//         setValue('make', carDetails.make);
//         setValue('model', carDetails.model);
//         setValue('year', carDetails.year);
//         setValue('color', carDetails.color);
//         setValue('emission_group', carDetails.emission_group);
//         setValue('valid_until', carDetails.valid_until.split('T')[0]); // Convert to YYYY-MM-DD
//         setValue('trim_level', carDetails.trim_level);
//         setValue('last_test', carDetails.last_test.split('T')[0]); // Convert to YYYY-MM-DD
//         setValue('model_type', carDetails.model_type);
//         setValue('model_number', carDetails.model_number);
//       } else {
//         alert('No car details found for this license plate.');
//       }
//     } catch (error) {
//       console.error('Error fetching car details:', error);
//       alert('Failed to auto-fill the form. Please check the license plate.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* License Plate */}
//       <div>
//         <label>License Plate</label>
//         <input 
//           type="text" 
//           {...register('license_plate', { required: 'License plate is required' })} 
//         />
//         {errors.license_plate && <span>{(errors.license_plate as any).message}</span>}
//       </div>

//       {/* Auto-Fill Button */}
//       <div>
//         <button 
//           type="button" 
//           onClick={handleAutoFillFromLicensePlate} 
//           disabled={isLoading}
//         >
//           {isLoading ? 'Loading...' : 'Auto Fill from License Plate'}
//         </button>
//       </div>

//       {/* Other Fields */}
//       <div>
//         <label>Make</label>
//         <input 
//           type="text" 
//           {...register('make', { required: 'Make is required' })} 
//         />
//         {errors.make && <span>{(errors.make as any).message}</span>}
//       </div>

//       <div>
//         <label>Model</label>
//         <input 
//           type="text" 
//           {...register('model', { required: 'Model is required' })} 
//         />
//         {errors.model && <span>{(errors.model as any).message}</span>}
//       </div>

//       <div>
//         <label>Year</label>
//         <input 
//           type="number" 
//           {...register('year', { required: 'Year is required' })} 
//         />
//         {errors.year && <span>{(errors.year as any).message}</span>}
//       </div>

//       <div>
//         <label>Color</label>
//         <input 
//           type="text" 
//           {...register('color', { required: 'Color is required' })} 
//         />
//         {errors.color && <span>{(errors.color as any).message}</span>}
//       </div>

//       <div>
//         <label>Emission Group</label>
//         <input 
//           type="text" 
//           {...register('emission_group')} 
//         />
//       </div>

//       <div>
//         <label>Valid Until</label>
//         <input 
//           type="date" 
//           {...register('valid_until', { required: 'Validity date is required' })} 
//         />
//         {errors.valid_until && <span>{(errors.valid_until as any).message}</span>}
//       </div>

//       <div>
//         <label>Trim Level</label>
//         <input 
//           type="text" 
//           {...register('trim_level')} 
//         />
//       </div>

//       <div>
//         <label>Last Test</label>
//         <input 
//           type="date" 
//           {...register('last_test', { required: 'Last test date is required' })} 
//         />
//         {errors.last_test && <span>{(errors.last_test as any).message}</span>}
//       </div>

//       <div>
//         <label>Model Type</label>
//         <select {...register('model_type', { required: 'Model type is required' })}>
//           <option value="">Select Model Type</option>
//           <option value="private">Private</option>
//           <option value="commercial">Commercial</option>
//         </select>
//         {errors.model_type && <span>{(errors.model_type as any).message}</span>}
//       </div>

//       <div>
//         <label>Model Number</label>
//         <input 
//           type="text" 
//           {...register('model_number', { required: 'Model number is required' })} 
//         />
//         {errors.model_number && <span>{(errors.model_number as any).message}</span>}
//       </div>

//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default CarForm;

import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  MenuItem,
  Paper,
  CircularProgress,
} from '@mui/material';

type CarDetails = {
  make: string;
  model: string;
  year: string;
  color: string;
  emission_group: string;
  valid_until: string;
  trim_level: string;
  last_test: string;
  model_type: string;
  model_number: string;
};

const CarForm = ({ existingCar, onSubmit }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    defaultValues: existingCar || {},
  });

  const handleAutoFillFromLicensePlate = async () => {
    const licensePlate = getValues('license_plate');
    if (!licensePlate) {
      alert('Please enter a license plate to auto-fill the form.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get<{ car: CarDetails }>(`http://localhost:3000/csv/search/${licensePlate}`);
      const carDetails = response.data.car;

      if (carDetails) {
        Object.entries(carDetails).forEach(([key, value]) => {
          if (key.includes('_until') || key.includes('test')) {
            setValue(key, value.split('T')[0]);
          } else {
            setValue(key, value);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching car details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Car Details
            </Typography>
          </Grid>

          {/* License Plate */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="License Plate"
              InputLabelProps={{ shrink: true }}
              error={!!errors.license_plate}
              helperText={errors.license_plate?.message as string}
              {...register('license_plate', { required: 'License plate is required' })}
            />
          </Grid>

          {/* Auto-Fill Button */}
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              onClick={handleAutoFillFromLicensePlate}
              disabled={isLoading}
              sx={{ mt: 1 }}
              fullWidth
            >
              {isLoading ? <CircularProgress size={24} /> : 'Auto Fill from License Plate'}
            </Button>
          </Grid>

          {/* Make and Model */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Make"
              InputLabelProps={{ shrink: true }}
              error={!!errors.make}
              helperText={errors.make?.message as string}
              {...register('make', { required: 'Make is required' })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Model"
              InputLabelProps={{ shrink: true }}
              error={!!errors.model}
              helperText={errors.model?.message as string}
              {...register('model', { required: 'Model is required' })}
            />
          </Grid>

          {/* Year and Color */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Year"
              type="number"
              InputLabelProps={{ shrink: true }}
              error={!!errors.year}
              helperText={errors.year?.message as string}
              {...register('year', { required: 'Year is required' })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              InputLabelProps={{ shrink: true }}
              error={!!errors.color}
              helperText={errors.color?.message as string}
              {...register('color', { required: 'Color is required' })}
            />
          </Grid>

          {/* Emission Group */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Emission Group"
              InputLabelProps={{ shrink: true }}
              {...register('emission_group')}
            />
          </Grid>

          {/* Model Type */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Model Type"
              InputLabelProps={{ shrink: true }}
              error={!!errors.model_type}
              helperText={errors.model_type?.message as string}
              defaultValue=""
              {...register('model_type', { required: 'Model type is required' })}
            >
              <MenuItem value="private">Private</MenuItem>
              <MenuItem value="commercial">Commercial</MenuItem>
            </TextField>
          </Grid>

          {/* Dates */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Valid Until"
              InputLabelProps={{ shrink: true }}
              error={!!errors.valid_until}
              helperText={errors.valid_until?.message as string}
              {...register('valid_until', { required: 'Valid until date is required' })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Last Test"
              InputLabelProps={{ shrink: true }}
              error={!!errors.last_test}
              helperText={errors.last_test?.message as string}
              {...register('last_test', { required: 'Last test date is required' })}
            />
          </Grid>

          {/* Additional Fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Trim Level"
              InputLabelProps={{ shrink: true }}
              {...register('trim_level')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Model Number"
              InputLabelProps={{ shrink: true }}
              error={!!errors.model_number}
              helperText={errors.model_number?.message as string}
              {...register('model_number', { required: 'Model number is required' })}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CarForm;
