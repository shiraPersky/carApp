// //render the graph based on the selected statistic
// import React from 'react';

// const GraphComponent = ({ data }: { data: any }) => {
//   return (
//     <div>
//       {/* Use a charting library like Chart.js or Recharts to render the graph here */}
//       <p>Graph data goes here</p>
//     </div>
//   );
// };


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
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphComponentProps {
  efficiencyGraph?: { labels: string[]; values: number[] };
  distanceGraph?: { labels: string[]; values: number[] };
  distancePerDayGraph?: { labels: string[]; values: number[] };
  litersGraph?: { labels: string[]; values: number[] };
  costGraph?: { labels: string[]; values: number[] };
  priceGraph?: { labels: string[]; values: number[] };
}

const GraphComponent: React.FC<GraphComponentProps> = (props) => {
  console.log("Graph Component Props:", props);

  const createChartData = (
    labels: string[] = [],
    values: number[] = [],
    label: string,
    color: string
  ) => {
    if (!labels.length || !values.length) {
      labels = ['No Data'];
      values = [0];
    }

    return {
      labels,
      datasets: [
        {
          label,
          data: values,
          borderColor: color,
          backgroundColor: `${color}33`,
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  const renderGraph = (
    data: { labels: string[]; values: number[] } | undefined,
    title: string,
    label: string,
    color: string
  ) => {
    return (
      <div className="w-full h-80 mb-8 p-4 border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="w-full h-64">
          <Line
            data={createChartData(data?.labels, data?.values, label, color)}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  display: true,
                  text: title
                }
              }
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {renderGraph(
        props.efficiencyGraph,
        'Fuel Efficiency Over Time',
        'Fuel Efficiency (km/L)',
        'rgb(75, 192, 192)'
      )}
      {renderGraph(
        props.distanceGraph,
        'Distance Between Fill-ups',
        'Distance (km)',
        'rgb(54, 162, 235)'
      )}
      {renderGraph(
        props.distancePerDayGraph,
        'Distance Per Day',
        'Distance (km/day)',
        'rgb(255, 206, 86)'
      )}
      {renderGraph(
        props.litersGraph,
        'Liters Per Fill-up',
        'Liters',
        'rgb(153, 102, 255)'
      )}
      {renderGraph(
        props.costGraph,
        'Cost Per Fill-up',
        'Cost (NIS)',
        'rgb(255, 159, 64)'
      )}
      {renderGraph(
        props.priceGraph,
        'Price Per Liter',
        'Price (NIS)',
        'rgb(255, 99, 132)'
      )}
    </div>
  );
};

export default GraphComponent;