// import { useForm } from 'react-hook-form';
// import React from 'react';

// const fuelTypes = [
//   "95 Octane (Regular Gasoline)", "98 Octane (Premium Gasoline)", "Electric", "Hybrid", "Diesel "
// ];

// const RefuelingForm = ({ existingRefuel, onSubmit }: any) => {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: existingRefuel || {},
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       {/* Car ID */}
//        {/* License Plate */}
//        <div>
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
//         <label>Kind of Fuel</label>
//         <select {...register('kindOfFuel', { required: 'Kind of fuel is required' })}>
//           <option value="">Select a fuel type</option>
//           {fuelTypes.map((fuel, index) => (
//             <option key={index} value={fuel}>
//               {fuel}
//             </option>
//           ))}
//         </select>
//         {errors.kindOfFuel && <span>{(errors.kindOfFuel as any).message}</span>} 
//       </div>
//       <div>
//         <label>Price per Liter</label>
//         <input 
//           type="number" 
//           step="0.01" 
//           {...register('pricePerLiter', { required: 'Price per liter is required' })} 
//         />
//         {errors.pricePerLiter && <span>{(errors.pricePerLiter as any).message}</span>}
//       </div>
//       <div>
//         <label>Total Cost</label>
//         <input 
//           type="number" 
//           step="0.01" 
//           {...register('totalCost', { required: 'Total cost is required' })} 
//         />
//         {errors.totalCost && <span>{(errors.totalCost as any).message}</span>}
//       </div>
//       <div>
//         <label>Liters</label>
//         <input 
//           type="number" 
//           step="0.01" 
//           {...register('liters', { required: 'Liters is required' })} 
//         />
//         {errors.liters && <span>{(errors.liters as any).message}</span>}
//       </div>
//       <div>
//         <label>Gas Station</label>
//         <input {...register('gasStation')} />
//       </div>
//       <div>
//         <label>Driver</label>
//         <input {...register('driver')} />
//       </div>
//       <div>
//         <label>Notes</label>
//         <textarea {...register('notes')} />
//       </div>
//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default RefuelingForm;

import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";

const fuelTypes = [
  "95 Octane (Regular Gasoline)",
  "98 Octane (Premium Gasoline)",
  "Electric",
  "Hybrid",
  "Diesel",
];

const RefuelingForm = ({ existingRefuel, onSubmit }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: existingRefuel || {},
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 600, margin: "0 auto" }}
    >
      <Typography variant="h5" gutterBottom>
        Refueling Form
      </Typography>

      {/* License Plate */}
      <TextField
        label="License Plate"
        variant="outlined"
        {...register("license_plate", { required: "License plate is required" })}
        error={!!errors.license_plate}
        helperText={errors.license_plate?.message}
        fullWidth
      />

      {/* Date */}
      <TextField
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        {...register("date", { required: "Date is required" })}
        error={!!errors.date}
        helperText={errors.date?.message}
        fullWidth
      />

      {/* Time */}
      <TextField
        label="Time"
        type="time"
        InputLabelProps={{ shrink: true }}
        {...register("time", { required: "Time is required" })}
        error={!!errors.time}
        helperText={errors.time?.message}
        fullWidth
      />

      {/* Odometer */}
      <TextField
        label="Odometer"
        type="number"
        {...register("odometer", { required: "Odometer is required" })}
        error={!!errors.odometer}
        helperText={errors.odometer?.message}
        fullWidth
      />

      {/* Kind of Fuel */}
      <FormControl fullWidth error={!!errors.kindOfFuel}>
        <InputLabel>Kind of Fuel</InputLabel>
        <Select
          {...register("kindOfFuel", { required: "Kind of fuel is required" })}
          defaultValue=""
        >
          <MenuItem value="">Select a fuel type</MenuItem>
          {fuelTypes.map((fuel, index) => (
            <MenuItem key={index} value={fuel}>
              {fuel}
            </MenuItem>
          ))}
        </Select>
        {errors.kindOfFuel && (
          <Typography variant="caption" color="error">
            {errors.kindOfFuel.message}
          </Typography>
        )}
      </FormControl>

      {/* Price per Liter */}
      <TextField
        label="Price per Liter"
        type="number"
        inputProps={{ step: "0.01" }}
        {...register("pricePerLiter", { required: "Price per liter is required" })}
        error={!!errors.pricePerLiter}
        helperText={errors.pricePerLiter?.message}
        fullWidth
      />

      {/* Total Cost */}
      <TextField
        label="Total Cost"
        type="number"
        inputProps={{ step: "0.01" }}
        {...register("totalCost", { required: "Total cost is required" })}
        error={!!errors.totalCost}
        helperText={errors.totalCost?.message}
        fullWidth
      />

      {/* Liters */}
      <TextField
        label="Liters"
        type="number"
        inputProps={{ step: "0.01" }}
        {...register("liters", { required: "Liters is required" })}
        error={!!errors.liters}
        helperText={errors.liters?.message}
        fullWidth
      />

      {/* Gas Station */}
      <TextField
        label="Gas Station"
        variant="outlined"
        {...register("gasStation")}
        fullWidth
      />

      {/* Driver */}
      <TextField
        label="Driver"
        variant="outlined"
        {...register("driver")}
        fullWidth
      />

      {/* Notes */}
      <TextField
        label="Notes"
        variant="outlined"
        multiline
        rows={3}
        {...register("notes")}
        fullWidth
      />

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
};

export default RefuelingForm;
