
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
