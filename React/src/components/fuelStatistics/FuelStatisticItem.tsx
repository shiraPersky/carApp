// //To display each statistic in the list.
// import React from 'react';

// const FuelStatisticItem = ({ title, value }: { title: string, value: string | number }) => {
//   return (
//     <div>
//       <h3>{title}</h3>
//       <p>{value}</p>
//     </div>
//   );
// };

// export default FuelStatisticItem;
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import '../../styles/FuelStatisticItem.css'; // Import the CSS file

const FuelStatisticItem = ({ title, value }) => {
  return (
    <Paper elevation={0} className="statistic-item">
      <Typography variant="body1" className="statistic-title">
        {title}
      </Typography>
      <Typography variant="body1" className="statistic-value">
        {value}
      </Typography>
    </Paper>
  );
};

export default FuelStatisticItem;