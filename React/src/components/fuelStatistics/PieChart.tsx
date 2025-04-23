
// import React from 'react';
// import { PieChart as RechartsChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
// import { Typography, Box } from '@mui/material';

// // More distinctive color palette
// const COLORS = [
//   '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', 
//   '#82CA9D', '#8DD1E1', '#A4DE6C', '#D0ED57', '#F5A623',
//   '#E27DD6', '#55A9F7', '#4DB6AC', '#FF7043', '#9575CD'
// ];

// const RADIAN = Math.PI / 180;

// // Custom label renderer to improve readability
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
//   const radius = outerRadius * 1.1;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   // Only show label for segments that are large enough
//   if (percent < 0.05) return null;

//   return (
//     <text 
//       x={x} 
//       y={y} 
//       fill="#333333"
//       textAnchor={x > cx ? 'start' : 'end'} 
//       dominantBaseline="central"
//       fontSize="12"
//     >
//       {`${name} (${(percent * 100).toFixed(1)}%)`}
//     </text>
//   );
// };

// const PieChart = ({ data, title = "" }) => {
//   if (!data || data.length === 0) {
//     return (
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
//         <Typography variant="body1" color="textSecondary">
//           No station data available
//         </Typography>
//       </Box>
//     );
//   }

//   // Transform the data to include a percentage calculation
//   const total = data.reduce((sum, entry) => sum + entry.count, 0);
//   const formattedData = data.map((entry) => ({
//     name: entry.name || entry.station || "Unknown",
//     value: entry.count,
//     percentage: ((entry.count / total) * 100).toFixed(1)
//   }));

//   return (
//     <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       {/* Title */}
//       <Typography variant="h6" component="h3" sx={{ marginBottom: 2, textAlign: 'center' }}>
//         {title}
//       </Typography>
      
//       {/* Chart Container */}
//       <Box
//         sx={{
//           width: '100%',
//           height: 300,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <RechartsChart width={300} height={300}>
//           <Pie
//             data={formattedData}
//             cx="50%"
//             cy="50%"
//             labelLine={true}
//             label={renderCustomizedLabel}
//             outerRadius={100}
//             fill="#8884d8"
//             dataKey="value"
//             paddingAngle={2}
//           >
//             {formattedData.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//                 stroke="#fff"
//                 strokeWidth={1}
//               />
//             ))}
//           </Pie>
//           <Tooltip
//             formatter={(value, name) => {
//               const numericValue = Number(value);
//               const percentage = isNaN(numericValue) ? 0 : (numericValue / total * 100).toFixed(1);
//               return [`${value} visits (${percentage}%)`, name];
//             }}
//           />
//           <Legend layout="horizontal" verticalAlign="bottom" align="center" />
//         </RechartsChart>
//       </Box>


            
//       <Box sx={{ marginTop: 2, textAlign: 'center' }}>
//         <Typography variant="body2" color="textSecondary">
//           Total visits: {total}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default PieChart;


import React from 'react';
import { PieChart as RechartsChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography, Box } from '@mui/material';

// More distinctive color palette
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', 
  '#82CA9D', '#8DD1E1', '#A4DE6C', '#D0ED57', '#F5A623',
  '#E27DD6', '#55A9F7', '#4DB6AC', '#FF7043', '#9575CD'
];

const RADIAN = Math.PI / 180;

// Custom label renderer to improve readability
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const radius = outerRadius * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Only show label for segments that are large enough
  if (percent < 0.05) return null;

  return (
    <text 
      x={x} 
      y={y} 
      fill="#333333"
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize="12"
    >
      {`${name} (${(percent * 100).toFixed(1)}%)`}
    </text>
  );
};

const PieChart = ({ data, title = "" }) => {
  if (!data || data.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
        <Typography variant="body1" color="textSecondary">
          No station data available
        </Typography>
      </Box>
    );
  }

  // Transform the data to include a percentage calculation
  const total = data.reduce((sum, entry) => sum + entry.count, 0);
  const formattedData = data.map((entry) => ({
    name: entry.name || entry.station || "Unknown",
    value: entry.count,
    percentage: ((entry.count / total) * 100).toFixed(1)
  }));

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Title */}
      <Typography variant="h6" component="h3" sx={{ marginBottom: 2, textAlign: 'center' }}>
        {title}
      </Typography>
      
     {/* Chart Container */}
      <Box
        sx={{
          width: '100%',
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RechartsChart width={300} height={300}>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => {
              const numericValue = Number(value);
              const percentage = isNaN(numericValue) ? 0 : (numericValue / total * 100).toFixed(1);
              return [`${value} visits (${percentage}%)`, name];
            }}
          />
          {/* REMOVE the default legend */}
          {/* <Legend layout="horizontal" verticalAlign="bottom" align="center" /> */}
        </RechartsChart>
      </Box>

      {/* Custom Legend */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mt: -3 }}>
        {formattedData.map((entry, index) => (
          <Box key={`legend-${index}`} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: COLORS[index % COLORS.length],
                borderRadius: '50%',
              }}
            />
            <Typography variant="body2" color="textSecondary">
              {entry.name}
            </Typography>
          </Box>
        ))}
      </Box>   
      <Box sx={{ marginTop: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          Total visits: {total}
        </Typography>
      </Box>
    </Box>
  );
};

export default PieChart;