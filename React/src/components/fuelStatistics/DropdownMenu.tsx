
import React, { useState } from 'react';

const DropdownMenu = ({ onTimePeriodChange }: { 
  onTimePeriodChange: (timePeriod: string, startDate?: string, endDate?: string) => void 
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('allTime');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPeriod = e.target.value;
    setSelectedPeriod(newPeriod);
    if (newPeriod !== 'customDates') {
      onTimePeriodChange(newPeriod); // For predefined periods, send only the period name
    }
  };

  const handleCustomDateChange = () => {
    if (customStartDate && customEndDate) {
      onTimePeriodChange('customDates', customStartDate, customEndDate);
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