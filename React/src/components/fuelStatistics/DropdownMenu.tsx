
// import React, { useState } from 'react';

// const DropdownMenu = ({ onTimePeriodChange }: { 
//   onTimePeriodChange: (timePeriod: string, startDate?: string, endDate?: string) => void 
// }) => {
//   const [selectedPeriod, setSelectedPeriod] = useState('allTime');
//   const [customStartDate, setCustomStartDate] = useState('');
//   const [customEndDate, setCustomEndDate] = useState('');

//   const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newPeriod = e.target.value;
//     setSelectedPeriod(newPeriod);
//     if (newPeriod !== 'customDates') {
//       onTimePeriodChange(newPeriod); // For predefined periods, send only the period name
//     }
//   };

//   const handleCustomDateChange = () => {
//     if (customStartDate && customEndDate) {
//       onTimePeriodChange('customDates', customStartDate, customEndDate);
//     }
//   };

//   return (
//     <div>
//       <select value={selectedPeriod} onChange={handlePeriodChange}>
//         <option value="allTime">All Time</option>
//         <option value="thisMonth">This Month</option>
//         <option value="lastMonth">Last Month</option>
//         <option value="thisYear">This Year</option>
//         <option value="lastYear">Last Year</option>
//         <option value="custom">Custom Date Range</option>
//       </select>

//       {selectedPeriod === 'custom' && (
//         <div>
//           <input
//             type="date"
//             value={customStartDate}
//             onChange={(e) => setCustomStartDate(e.target.value)}
//             placeholder="Start Date"
//           />
//           <input
//             type="date"
//             value={customEndDate}
//             onChange={(e) => setCustomEndDate(e.target.value)}
//             placeholder="End Date"
//           />
//           <button onClick={handleCustomDateChange}>Apply Date Range</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropdownMenu;

import React, { useState } from 'react';
import { Select, MenuItem, TextField, Button, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';

const DropdownMenu = ({ onTimePeriodChange }: { 
  onTimePeriodChange: (timePeriod: string, startDate?: string, endDate?: string) => void 
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('allTime');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const handlePeriodChange = (e: SelectChangeEvent<string>) => {
    const newPeriod = e.target.value;
    setSelectedPeriod(newPeriod);
    if (newPeriod !== 'customDates') {
      onTimePeriodChange(newPeriod);
    }
  };

  const handleCustomDateChange = () => {
    if (customStartDate && customEndDate) {
      onTimePeriodChange('customDates', customStartDate, customEndDate);
    }
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>Time Period</InputLabel>
      <Select value={selectedPeriod} onChange={handlePeriodChange} label="Time Period">
        <MenuItem value="allTime">All Time</MenuItem>
        <MenuItem value="thisMonth">This Month</MenuItem>
        <MenuItem value="lastMonth">Last Month</MenuItem>
        <MenuItem value="thisYear">This Year</MenuItem>
        <MenuItem value="lastYear">Last Year</MenuItem>
        <MenuItem value="customDates">Custom Dates</MenuItem>
      </Select>
      {selectedPeriod === 'customDates' && (
        <div>
          <TextField
            label="Start Date"
            type="date"
            value={customStartDate}
            onChange={(e) => setCustomStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="End Date"
            type="date"
            value={customEndDate}
            onChange={(e) => setCustomEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleCustomDateChange} variant="contained" color="primary" sx={{ mt: 2 }}>
            Apply Dates
          </Button>
        </div>
      )}
    </FormControl>
  );
};

export default DropdownMenu;
