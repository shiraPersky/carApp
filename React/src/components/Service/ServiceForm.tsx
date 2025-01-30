// import { useForm } from 'react-hook-form';
// import React from 'react';

// const serviceTypes = [
//   "Air conditioning", "Air filter", "Battery", "Belts", "Brake fluid", "Brake pad", 
//   "Car wash", "Fuel filter", "Inspection", "Labor cost", "Lights", "New tires", 
//   "Oil change", "Oil filter", "Rotate tires", "Suspension system", "Tire pressure", 
//   "Wheel alignment", "Engine oil", "Spark plugs", "Change Tires", "Coolant", 
//   "Turn signals", "Parking lights", "Windshields wipers"
// ];

// const ServiceForm = ({ existingService, onSubmit }: any) => {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: existingService || {},
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* Car ID */}
//       <div>
//         <label>Car ID</label>
//         <input 
//           type="number" 
//           {...register('car_id', { required: 'Car ID is required' })} 
//         />
//         {errors.car_id && <span>{(errors.car_id as any).message}</span>}
//       </div>
//       <div>
//         <label>License Plate</label>
//         <input 
//           type="text" 
//           {...register('license_plate', { required: 'License plate is required' })} 
//         />
//       </div>
//       <div>
//         <label>Date</label>
//         <input type="date" {...register('date', { required: 'Date is required' })} />
//       </div>
//       <div>
//         <label>Time</label>
//         <input type="time" {...register('time', { required: 'Time is required' })} />
//       </div>
//       <div>
//         <label>Odometer</label>
//         <input type="number" {...register('odometer', { required: 'Odometer is required' })} />
//       </div>
//       <div>
//         <label>Service Type</label>
//         <select {...register('service_type', { required: 'Service type is required' })}>
//           <option value="">Select a service</option>
//           {serviceTypes.map((service, index) => (
//             <option key={index} value={service}>
//               {service}
//             </option>
//           ))}
//         </select>
//         {errors.service_type && <span>{(errors.service_type as any).message}</span>} 
//       </div>
//       <div>
//         <label>Place</label>
//         <input {...register('place')} />
//       </div>
//       <div>
//         <label>Driver</label>
//         <input {...register('driver')} />
//       </div>
//       <div>
//         <label>Payment Method</label>
//         <input {...register('paymentMethod', { required: 'Payment method is required' })} />
//         {errors.paymentMethod && <span>{(errors.paymentMethod as any).message}</span>}
//       </div>
//       <div>
//         <label>Cost</label>
//         <input type="number" {...register('cost', { required: 'Cost is required' })} />
//       </div>
//       <div>
//         <label>Notes</label>
//         <textarea {...register('notes')} />
//       </div>
//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default ServiceForm;






// import { useForm } from 'react-hook-form';
// import React, { useEffect, useState } from 'react';

// const serviceTypes = [
//   "Air conditioning", "Air filter", "Battery", "Belts", "Brake fluid", "Brake pad", 
//   "Car wash", "Fuel filter", "Inspection", "Labor cost", "Lights", "New tires", 
//   "Oil change", "Oil filter", "Rotate tires", "Suspension system", "Tire pressure", 
//   "Wheel alignment", "Engine oil", "Spark plugs", "Change Tires", "Coolant", 
//   "Turn signals", "Parking lights", "Windshields wipers"
// ];

// const ServiceForm = ({ existingService, onSubmit }: any) => {
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm({
//     defaultValues: existingService || {},
//   });

//   const [selectedServiceType, setSelectedServiceType] = useState<string>(existingService?.service_type || '');

//   // Handling service type change
//   const handleServiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selected = e.target.value;
//     setSelectedServiceType(selected);
//     // Example: Resetting place and driver if certain service types are selected
//     if (selected === "Oil change") {
//       setValue('place', 'Oil Service Center'); // default place for oil change
//     }
//   };

//   useEffect(() => {
//     if (existingService?.car_id) {
//       // If a car is selected, fetch its details, for example, license plate
//       setValue('license_plate', existingService.license_plate || '');
//     }
//   }, [existingService, setValue]);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* Car ID */}
//       <div>
//         <label>Car ID</label>
//         <input 
//           type="number" 
//           {...register('car_id', { required: 'Car ID is required' })} 
//         />
//         {errors.car_id && <span>{(errors.car_id as any).message}</span>}
//       </div>

//       {/* License Plate */}
//       <div>
//         <label>License Plate</label>
//         <input 
//           type="text" 
//           {...register('license_plate', { required: 'License plate is required' })} 
//         />
//       </div>

//       {/* Date */}
//       <div>
//         <label>Date</label>
//         <input type="date" {...register('date', { required: 'Date is required' })} />
//       </div>

//       {/* Time */}
//       <div>
//         <label>Time</label>
//         <input type="time" {...register('time', { required: 'Time is required' })} />
//       </div>

//       {/* Odometer */}
//       <div>
//         <label>Odometer</label>
//         <input type="number" {...register('odometer', { required: 'Odometer is required' })} />
//       </div>

//       {/* Service Type */}
//       <div>
//         <label>Service Type</label>
//         <select 
//           {...register('service_type', { required: 'Service type is required' })} 
//           value={selectedServiceType} 
//           onChange={handleServiceTypeChange}
//         >
//           <option value="">Select a service</option>
//           {serviceTypes.map((service, index) => (
//             <option key={index} value={service}>
//               {service}
//             </option>
//           ))}
//         </select>
//         {errors.service_type && <span>{(errors.service_type as any).message}</span>} 
//       </div>

//       {/* Place */}
//       <div>
//         <label>Place</label>
//         <input {...register('place')} />
//       </div>

//       {/* Driver */}
//       <div>
//         <label>Driver</label>
//         <input {...register('driver')} />
//       </div>

//       {/* Payment Method */}
//       <div>
//         <label>Payment Method</label>
//         <input 
//           {...register('paymentMethod', { required: 'Payment method is required' })} 
//         />
//         {errors.paymentMethod && <span>{(errors.paymentMethod as any).message}</span>}
//       </div>

//       {/* Cost */}
//       <div>
//         <label>Cost</label>
//         <input 
//           type="number" 
//           {...register('cost', { required: 'Cost is required' })} 
//         />
//       </div>

//       {/* Notes */}
//       <div>
//         <label>Notes</label>
//         <textarea {...register('notes')} />
//       </div>

//       {/* Submit Button */}
//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default ServiceForm;


// import { useForm } from 'react-hook-form';
// import React, { useEffect, useState } from 'react';
// import {
//   TextField,
//   MenuItem,
//   Button,
//   Grid,
//   Box,
//   Paper,
//   Typography,
//   CircularProgress
// } from '@mui/material';

// const serviceTypes = [
//   "Air conditioning", "Air filter", "Battery", "Belts", "Brake fluid", "Brake pad", 
//   "Car wash", "Fuel filter", "Inspection", "Labor cost", "Lights", "New tires", 
//   "Oil change", "Oil filter", "Rotate tires", "Suspension system", "Tire pressure", 
//   "Wheel alignment", "Engine oil", "Spark plugs", "Change Tires", "Coolant", 
//   "Turn signals", "Parking lights", "Windshields wipers"
// ];

// const ServiceForm = ({ existingService, onSubmit }: any) => {
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm({
//     defaultValues: existingService || {},
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   const handleServiceTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedServiceType = event.target.value;
//     setValue('service_type', selectedServiceType);  // Ensure the form value is updated
//   };
  

//   useEffect(() => {
//     if (existingService?.service_type) {
//       setValue('service_type', existingService.service_type);
//     }
//   }, [existingService, setValue]);

//   return (
//     <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Grid container spacing={3}>
//           {/* Service Type */}
//           <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             select
//             label="Service Type"
//             InputLabelProps={{ shrink: true }}
//             value={existingService?.service_type || ''}
//             onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//               // Handle the internal form value change
//               register('service_type').onChange(event);

//               // Correctly type the event for the serviceType change handler
//               handleServiceTypeChange(event as React.ChangeEvent<HTMLSelectElement>);
//             }}
//             error={!!errors.service_type}
//             helperText={errors.service_type?.message as string}
//           >
//             {serviceTypes.map((service, index) => (
//               <MenuItem key={index} value={service}>
//                 {service}
//               </MenuItem>
//             ))}
//           </TextField>



//           </Grid>

//           {/* Other form fields */}
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Car ID"
//               type="number"
//               InputLabelProps={{ shrink: true }}
//               error={!!errors.car_id}
//               helperText={errors.car_id?.message as string}
//               {...register('car_id', { required: 'Car ID is required' })}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="License Plate"
//               InputLabelProps={{ shrink: true }}
//               error={!!errors.license_plate}
//               helperText={errors.license_plate?.message as string}
//               {...register('license_plate', { required: 'License plate is required' })}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               type="date"
//               label="Date"
//               InputLabelProps={{ shrink: true }}
//               error={!!errors.date}
//               helperText={errors.date?.message as string}
//               {...register('date', { required: 'Date is required' })}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               type="time"
//               label="Time"
//               InputLabelProps={{ shrink: true }}
//               error={!!errors.time}
//               helperText={errors.time?.message as string}
//               {...register('time', { required: 'Time is required' })}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               type="number"
//               label="Odometer"
//               InputLabelProps={{ shrink: true }}
//               error={!!errors.odometer}
//               helperText={errors.odometer?.message as string}
//               {...register('odometer', { required: 'Odometer is required' })}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Place"
//               InputLabelProps={{ shrink: true }}
//               {...register('place')}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Driver"
//               InputLabelProps={{ shrink: true }}
//               {...register('driver')}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Payment Method"
//               InputLabelProps={{ shrink: true }}
//               error={!!errors.paymentMethod}
//               helperText={errors.paymentMethod?.message as string}
//               {...register('paymentMethod', { required: 'Payment method is required' })}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               type="number"
//               label="Cost"
//               InputLabelProps={{ shrink: true }}
//               error={!!errors.cost}
//               helperText={errors.cost?.message as string}
//               {...register('cost', { required: 'Cost is required' })}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Notes"
//               InputLabelProps={{ shrink: true }}
//               {...register('notes')}
//             />
//           </Grid>

//           {/* Submit Button */}
//           <Grid item xs={12}>
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 disabled={isLoading}
//               >
//                 {isLoading ? <CircularProgress size={24} /> : 'Save'}
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </form>
//     </Paper>
//   );
// };

// export default ServiceForm;


import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, MenuItem, Button, Grid } from '@mui/material';

const ServiceForm = ({ existingService, onSubmit }: any) => {
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
    defaultValues: existingService || {},
  });

  const serviceTypes = [
    "Air conditioning", "Air filter", "Battery", "Belts", "Brake fluid", "Brake pad", 
    "Car wash", "Fuel filter", "Inspection", "Labor cost", "Lights", "New tires", 
    "Oil change", "Oil filter", "Rotate tires", "Suspension system", "Tire pressure", 
    "Wheel alignment", "Engine oil", "Spark plugs", "Change Tires", "Coolant", 
    "Turn signals", "Parking lights", "Windshields wipers"
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        {/* Car ID */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="car_id"
            control={control}
            defaultValue={existingService?.car_id || ''}
            rules={{ required: 'Car ID is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label="Car ID"
                error={!!errors.car_id}
                helperText={errors.car_id?.message as string}
              />
            )}
          />
        </Grid>

        {/* License Plate */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="license_plate"
            control={control}
            defaultValue={existingService?.license_plate || ''}
            rules={{ required: 'License plate is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="License Plate"
                error={!!errors.license_plate}
                helperText={errors.license_plate?.message as string}
              />
            )}
          />
        </Grid>

        {/* Date */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="date"
            control={control}
            defaultValue={existingService?.date || ''}
            rules={{ required: 'Date is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
                helperText={errors.date?.message as string}
              />
            )}
          />
        </Grid>

        {/* Time */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="time"
            control={control}
            defaultValue={existingService?.time || ''}
            rules={{ required: 'Time is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="time"
                label="Time"
                InputLabelProps={{ shrink: true }}
                error={!!errors.time}
                helperText={errors.time?.message as string}
              />
            )}
          />
        </Grid>

        {/* Odometer */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="odometer"
            control={control}
            defaultValue={existingService?.odometer || ''}
            rules={{ required: 'Odometer is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label="Odometer"
                error={!!errors.odometer}
                helperText={errors.odometer?.message as string}
              />
            )}
          />
        </Grid>

        {/* Service Type */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="service_type"
            control={control}
            defaultValue={existingService?.service_type || ''}
            rules={{ required: 'Service type is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                select
                label="Service Type"
                error={!!errors.service_type}
                helperText={errors.service_type?.message as string}
                InputLabelProps={{ shrink: true }}
              >
                {serviceTypes.map((service, index) => (
                  <MenuItem key={index} value={service}>
                    {service}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        {/* Place */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="place"
            control={control}
            defaultValue={existingService?.place || ''}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Place"
              />
            )}
          />
        </Grid>

        {/* Driver */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="driver"
            control={control}
            defaultValue={existingService?.driver || ''}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Driver"
              />
            )}
          />
        </Grid>

        {/* Payment Method */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="paymentMethod"
            control={control}
            defaultValue={existingService?.paymentMethod || ''}
            rules={{ required: 'Payment method is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Payment Method"
                error={!!errors.paymentMethod}
                helperText={errors.paymentMethod?.message as string}
              />
            )}
          />
        </Grid>

        {/* Cost */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="cost"
            control={control}
            defaultValue={existingService?.cost || ''}
            rules={{ required: 'Cost is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label="Cost"
                error={!!errors.cost}
                helperText={errors.cost?.message as string}
              />
            )}
          />
        </Grid>

        {/* Notes */}
        <Grid item xs={12}>
          <Controller
            name="notes"
            control={control}
            defaultValue={existingService?.notes || ''}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Notes"
                multiline
                rows={4}
              />
            )}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ServiceForm;
