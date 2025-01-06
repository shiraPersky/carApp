import React from 'react';
import { PieChart as RechartsChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500">No station data available</div>;
  }

  // Transform the data to include a percentage calculation
  const total = data.reduce((sum, entry) => sum + entry.count, 0);
  const formattedData = data.map((entry, index) => ({
    name: entry.station,
    value: entry.count,
    percentage: ((entry.count / total) * 100).toFixed(1)
  }));

  return (
    <div className="w-full flex flex-col items-center">
      <RechartsChart width={400} height={400}>
        <Pie
          data={formattedData}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={({ name, percentage }) => `${name} (${percentage}%)`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {formattedData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]} 
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value, name) => [`${value} visits`, name]}
        />
        <Legend />
      </RechartsChart>
      
      <div className="mt-4 text-sm text-center">
      <p className="text-gray-600">
          Total visits: {total}
        </p>
      </div>
    </div>
  );
};

export default PieChart;