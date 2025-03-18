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
