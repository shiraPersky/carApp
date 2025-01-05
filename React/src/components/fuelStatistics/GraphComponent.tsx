import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface GraphComponentProps {
  efficiencyGraph?: { labels: string[]; values: number[] };
  distanceGraph?: { labels: string[]; values: number[] };
  distancePerDayGraph?: { labels: string[]; values: number[] };
  litersGraph?: { labels: string[]; values: number[] };
  costGraph?: { labels: string[]; values: number[] };
  priceGraph?: { labels: string[]; values: number[] };
}

const GraphComponent: React.FC<GraphComponentProps> = (props) => {
  const createChartData = (labels: string[] = [], values: number[] = [], label: string, color: string) => ({
    labels: labels.length ? labels : ['No Data'],
    datasets: [
      {
        label,
        data: values.length ? values : [0],
        borderColor: color,
        backgroundColor: `${color}33`,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const, // Use 'as const' for string literals
        labels: { font: { size: 12 } },
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const, // Use 'as const' to ensure the type matches the expected values
        intersect: false,
      },
    },
    scales: {
      x: { display: true, grid: { display: false } },
      y: { display: true, beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.1)' } },
    },
  };
  
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {Object.entries(props).map(([key, data], index) => {
        if (data) {
          return (
            <div key={index} className="w-full h-80 mb-8 p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">{key.replace(/Graph$/, '').replace(/([a-z])([A-Z])/g, '$1 $2')}</h3>
              <div className="w-full h-64">
                <Line data={createChartData(data.labels, data.values, key, `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`)} options={chartOptions} />
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default GraphComponent;
