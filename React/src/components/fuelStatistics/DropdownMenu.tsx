//To allow the user to select different time periods for statistics
import React, { useState } from 'react';

const DropdownMenu = ({ onTimePeriodChange }: { onTimePeriodChange: (timePeriod: string) => void }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('allTime'); // Default to "All Time"
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Handle time period change from dropdown menu
  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPeriod = e.target.value;
    setSelectedPeriod(newPeriod);
    
    if (newPeriod === 'custom') {
      // Trigger when Custom Range is selected
      onTimePeriodChange(`custom:${customStartDate}:${customEndDate}`);
    } else {
      // Trigger for other time periods like 'All Time', 'This Month', etc.
      onTimePeriodChange(newPeriod);
    }
  };

  // Handle date change for custom range
  const handleCustomDateChange = () => {
    if (customStartDate && customEndDate) {
      // Trigger custom date range when dates are selected
      onTimePeriodChange(`custom:${customStartDate}:${customEndDate}`);
    }
  };

  return (
    <div>
      <select value={selectedPeriod} onChange={handlePeriodChange}>
        <option value="allTime">All Time</option>
        <option value="thisMonth">This Month</option>
        <option value="lastMonth">Last Month</option>
        <option value="thisYear">This Year</option>
        <option value="lastYear">Last Year</option>
        <option value="custom">Custom Date Range</option>
      </select>

      {selectedPeriod === 'custom' && (
        <div>
          <input
            type="date"
            value={customStartDate}
            onChange={(e) => setCustomStartDate(e.target.value)}
            placeholder="Start Date"
          />
          <input
            type="date"
            value={customEndDate}
            onChange={(e) => setCustomEndDate(e.target.value)}
            placeholder="End Date"
          />
          <button onClick={handleCustomDateChange}>Apply Date Range</button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
