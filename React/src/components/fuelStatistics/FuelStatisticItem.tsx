//To display each statistic in the list.
import React from 'react';

const FuelStatisticItem = ({ title, value }: { title: string, value: string | number }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default FuelStatisticItem;
