// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// export interface GraphComponentProps {
//   efficiencyGraph?: { labels: string[]; values: number[] };
//   distanceGraph?: { labels: string[]; values: number[] };
//   distancePerDayGraph?: { labels: string[]; values: number[] };
//   litersGraph?: { labels: string[]; values: number[] };
//   costGraph?: { labels: string[]; values: number[] };
//   priceGraph?: { labels: string[]; values: number[] };
// }

// const GraphComponent: React.FC<GraphComponentProps> = (props) => {
//   const createChartData = (labels: string[] = [], values: number[] = [], label: string, color: string) => ({
//     labels: labels.length ? labels : ['No Data'],
//     datasets: [
//       {
//         label,
//         data: values.length ? values : [0],
//         borderColor: color,
//         backgroundColor: `${color}33`,
//         fill: true,
//         tension: 0.4,
//         pointRadius: 6,
//         pointHoverRadius: 8,
//       },
//     ],
//   });

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top' as const, // Use 'as const' for string literals
//         labels: { font: { size: 12 } },
//       },
//       tooltip: {
//         enabled: true,
//         mode: 'index' as const, // Use 'as const' to ensure the type matches the expected values
//         intersect: false,
//       },
//     },
//     scales: {
//       x: { display: true, grid: { display: false } },
//       y: { display: true, beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.1)' } },
//     },
//   };
  
  

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
//       {Object.entries(props).map(([key, data], index) => {
//         if (data) {
//           return (
//             <div key={index} className="w-full h-80 mb-8 p-4 border rounded-lg shadow-sm">
//               <h3 className="text-lg font-semibold mb-4">{key.replace(/Graph$/, '').replace(/([a-z])([A-Z])/g, '$1 $2')}</h3>
//               <div className="w-full h-64">
//                 <Line data={createChartData(data.labels, data.values, key, `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`)} options={chartOptions} />
//               </div>
//             </div>
//           );
//         }
//         return null;
//       })}
//     </div>
//   );
// };

// export default GraphComponent;






// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartOptions,
// } from 'chart.js';
// import { Bar, Line } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale, 
//   LinearScale, 
//   PointElement, 
//   LineElement, 
//   BarElement,
//   Title, 
//   Tooltip, 
//   Legend
// );

// export interface GraphComponentProps {
//   efficiencyGraph?: { labels: string[]; values: number[] };
//   distanceGraph?: { labels: string[]; values: number[] };
//   distancePerDayGraph?: { labels: string[]; values: number[] };
//   litersGraph?: { labels: string[]; values: number[] };
//   costGraph?: { labels: string[]; values: number[] };
//   priceGraph?: { labels: string[]; values: number[] };
//   chartType?: 'bar' | 'line';
//   maxDataPoints?: number;
// }

// const GraphComponent: React.FC<GraphComponentProps> = (props) => {
//   // Default to bar chart if not specified
//   const chartType = props.chartType || 'bar';
//   // Default max data points to show
//   const maxDataPoints = props.maxDataPoints || 12;

//   const getChartColor = (key: string) => {
//     const colors = {
//       efficiencyGraph: 'rgb(75, 192, 192)',
//       distanceGraph: 'rgb(54, 162, 235)',
//       distancePerDayGraph: 'rgb(65, 105, 225)',
//       litersGraph: 'rgb(153, 102, 255)',
//       costGraph: 'rgb(255, 99, 132)',
//       priceGraph: 'rgb(255, 159, 64)'
//     };

//     return colors[key] || `rgb(${Math.round(Math.random() * 200)}, ${Math.round(Math.random() * 200)}, ${Math.round(Math.random() * 200)})`;
//   };

//   // Process and aggregate data to limit the number of displayed points
//   const processChartData = (labels: string[] = [], values: number[] = [], maxPoints: number) => {
//     if (labels.length <= maxPoints) {
//       return { labels, values };
//     }

//     // Determine how many points to group together
//     const groupSize = Math.ceil(labels.length / maxPoints);
//     const aggregatedLabels: string[] = [];
//     const aggregatedValues: number[] = [];

//     for (let i = 0; i < labels.length; i += groupSize) {
//       const groupLabels = labels.slice(i, i + groupSize);
//       const groupValues = values.slice(i, i + groupSize);
      
//       // Use the first and last label in the group to create a range
//       const startLabel = groupLabels[0];
//       const endLabel = groupLabels[groupLabels.length - 1];
//       const groupLabel = startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;
      
//       // Calculate average for the group
//       const sum = groupValues.reduce((acc, val) => acc + val, 0);
//       const avg = groupValues.length > 0 ? sum / groupValues.length : 0;
      
//       aggregatedLabels.push(groupLabel);
//       aggregatedValues.push(parseFloat(avg.toFixed(2)));
//     }

//     return { labels: aggregatedLabels, values: aggregatedValues };
//   };

//   const createChartData = (labels: string[] = [], values: number[] = [], label: string, color: string) => {
//     // Process data to limit number of points
//     const processedData = processChartData(labels, values, maxDataPoints);
    
//     return {
//       labels: processedData.labels.length ? processedData.labels : ['No Data'],
//       datasets: [
//         {
//           label,
//           data: processedData.values.length ? processedData.values : [0],
//           backgroundColor: `${color}99`,
//           borderColor: color,
//           borderWidth: 1,
//           hoverBackgroundColor: color,
//           barThickness: 'flex', 
//           maxBarThickness: 50,
//           categoryPercentage: 0.8,
//           barPercentage: 0.9,
//           ...(chartType === 'line' && {
//             fill: false,
//             tension: 0.1,
//             pointRadius: 4,
//             pointHoverRadius: 6,
//           }),
//         },
//       ],
//     };
//   };

//   const chartOptions: ChartOptions<'bar' | 'line'> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//         labels: { font: { size: 12 } },
//       },
//       tooltip: {
//         enabled: true,
//         mode: 'index',
//         intersect: false,
//       },
//     },
//     scales: {
//       x: { 
//         display: true, 
//         grid: { display: false },
//         ticks: {
//           maxRotation: 45,
//           minRotation: 0,
//           autoSkip: true,
//           maxTicksLimit: maxDataPoints,
//           font: {
//             size: 10
//           }
//         }
//       },
//       y: { 
//         display: true, 
//         beginAtZero: true, 
//         grid: { color: 'rgba(0, 0, 0, 0.1)' },
//         ticks: {
//           callback: function(value) {
//             // Format large numbers more nicely
//             if (Math.abs(Number(value)) >= 1000) {
//               return (Number(value) / 1000).toFixed(1) + 'k';
//             }
//             return value;
//           }
//         }
//       },
//     },
//   };

//   const formatTitle = (key: string): string => {
//     return key
//       .replace(/Graph$/, '')
//       .replace(/([a-z])([A-Z])/g, '$1 $2')
//       .split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   };

//   const renderChart = (key: string, data: any) => {
//     if (!data) return null;
    
//     const color = getChartColor(key);
//     const chartData = createChartData(
//       data.labels, 
//       data.values, 
//       formatTitle(key), 
//       color
//     );
    
//     return (
//       <div key={key} className="chart-container">
//         <h3 className="chart-title">{formatTitle(key)}</h3>
//         <div style={{ height: '300px', width: '100%' }}>
//           {chartType === 'bar' ? (
//             <Bar data={chartData} options={chartOptions} />
//           ) : (
//             <Line data={chartData} options={chartOptions} />
//           )}
//         </div>
//       </div>
//     );
//   };

//   // If we have only a single graph property passed, render it in full size
//   const singleGraph = Object.entries(props).filter(([key]) => 
//     key !== 'chartType' && key !== 'maxDataPoints').length === 1;

//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       {Object.entries(props).map(([key, data]) => {
//         if (key !== 'chartType' && key !== 'maxDataPoints' && data) {
//           return renderChart(key, data);
//         }
//         return null;
//       })}
//     </div>
//   );
// };

// export default GraphComponent;





// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartOptions,
//   ChartData,
// } from 'chart.js';
// import { Bar, Line } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale, 
//   LinearScale, 
//   PointElement, 
//   LineElement, 
//   BarElement,
//   Title, 
//   Tooltip, 
//   Legend
// );

// export interface GraphComponentProps {
//   efficiencyGraph?: { labels: string[]; values: number[] };
//   distanceGraph?: { labels: string[]; values: number[] };
//   distancePerDayGraph?: { labels: string[]; values: number[] };
//   litersGraph?: { labels: string[]; values: number[] };
//   costGraph?: { labels: string[]; values: number[] };
//   priceGraph?: { labels: string[]; values: number[] };
//   chartType?: 'bar' | 'line';
//   maxDataPoints?: number;
// }

// const GraphComponent: React.FC<GraphComponentProps> = (props) => {
//   // Default to bar chart if not specified
//   const chartType = props.chartType || 'bar';
//   // Default max data points to show
//   const maxDataPoints = props.maxDataPoints || 12;

//   const getChartColor = (key: string): string => {
//     const colors: Record<string, string> = {
//       efficiencyGraph: 'rgb(75, 192, 192)',
//       distanceGraph: 'rgb(54, 162, 235)',
//       distancePerDayGraph: 'rgb(65, 105, 225)',
//       litersGraph: 'rgb(153, 102, 255)',
//       costGraph: 'rgb(255, 99, 132)',
//       priceGraph: 'rgb(255, 159, 64)'
//     };

//     return colors[key as keyof typeof colors] || `rgb(${Math.round(Math.random() * 200)}, ${Math.round(Math.random() * 200)}, ${Math.round(Math.random() * 200)})`;
//   };

//   // Process and aggregate data to limit the number of displayed points
//   const processChartData = (labels: string[] = [], values: number[] = [], maxPoints: number) => {
//     if (labels.length <= maxPoints) {
//       return { labels, values };
//     }

//     // Determine how many points to group together
//     const groupSize = Math.ceil(labels.length / maxPoints);
//     const aggregatedLabels: string[] = [];
//     const aggregatedValues: number[] = [];

//     for (let i = 0; i < labels.length; i += groupSize) {
//       const groupLabels = labels.slice(i, i + groupSize);
//       const groupValues = values.slice(i, i + groupSize);
      
//       // Use the first and last label in the group to create a range
//       const startLabel = groupLabels[0];
//       const endLabel = groupLabels[groupLabels.length - 1];
//       const groupLabel = startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;
      
//       // Calculate average for the group
//       const sum = groupValues.reduce((acc, val) => acc + val, 0);
//       const avg = groupValues.length > 0 ? sum / groupValues.length : 0;
      
//       aggregatedLabels.push(groupLabel);
//       aggregatedValues.push(parseFloat(avg.toFixed(2)));
//     }

//     return { labels: aggregatedLabels, values: aggregatedValues };
//   };

//   const createChartData = (labels: string[] = [], values: number[] = [], label: string, color: string): ChartData<'bar' | 'line'> => {
//     // Process data to limit number of points
//     const processedData = processChartData(labels, values, maxDataPoints);
    
//     return {
//       labels: processedData.labels.length ? processedData.labels : ['No Data'],
//       datasets: [
//         {
//           label,
//           data: processedData.values.length ? processedData.values : [0],
//           backgroundColor: `${color}99`,
//           borderColor: color,
//           borderWidth: 1,
//           hoverBackgroundColor: color,
//           barThickness: 'flex' as const, 
//           maxBarThickness: 50,
//           categoryPercentage: 0.8,
//           barPercentage: 0.9,
//           ...(chartType === 'line' && {
//             fill: false,
//             tension: 0.1,
//             pointRadius: 4,
//             pointHoverRadius: 6,
//           }),
//         },
//       ],
//     };
//   };

//   const chartOptions: ChartOptions<'bar' | 'line'> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top' as const,
//         labels: { font: { size: 12 } },
//       },
//       tooltip: {
//         enabled: true,
//         mode: 'index' as const,
//         intersect: false,
//       },
//       title: {
//         display: false,
//         font: {
//           size: 16,
//           weight: 'bold'
//         }
//       }
//     },
//     scales: {
//       x: { 
//         display: true, 
//         grid: { display: false },
//         ticks: {
//           maxRotation: 45,
//           minRotation: 0,
//           autoSkip: true,
//           maxTicksLimit: maxDataPoints,
//           font: {
//             size: 10
//           }
//         }
//       },
//       y: { 
//         display: true, 
//         beginAtZero: true, 
//         grid: { color: 'rgba(0, 0, 0, 0.1)' },
//         title: {
//           display: true,
//           font: {
//             size: 10
//           }
//         },
//         ticks: {
//           font: {
//             size: 10
//           },
//           callback: function(value) {
//             // Format large numbers more nicely
//             if (Math.abs(Number(value)) >= 1000) {
//               return (Number(value) / 1000).toFixed(1) + 'k';
//             }
//             return value;
//           }
//         }
//       },
//     },
//   };

//   const formatTitle = (key: string): string => {
//     return key
//       .replace(/Graph$/, '')
//       .replace(/([a-z])([A-Z])/g, '$1 $2')
//       .split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   };

//   const renderChart = (key: string, data: any) => {
//     if (!data) return null;
    
//     const color = getChartColor(key);
//     const chartData = createChartData(
//       data.labels, 
//       data.values, 
//       formatTitle(key), 
//       color
//     );
    
//     return (
//       <div key={key} className="chart-container">
//         <h3 className="chart-title" style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
//           {formatTitle(key)}
//         </h3>
//         <div style={{ height: '300px', width: '100%' }}>
//           {chartType === 'bar' ? (
//             <Bar data={chartData} options={chartOptions} />
//           ) : (
//             <Line data={chartData} options={chartOptions} />
//           )}
//         </div>
//       </div>
//     );
//   };

//   // If we have only a single graph property passed, render it in full size
//   const singleGraph = Object.entries(props).filter(([key]) => 
//     key !== 'chartType' && key !== 'maxDataPoints').length === 1;

//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       {Object.entries(props).map(([key, data]) => {
//         if (key !== 'chartType' && key !== 'maxDataPoints' && data) {
//           return renderChart(key, data);
//         }
//         return null;
//       })}
//     </div>
//   );
// };

// export default GraphComponent;




// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartOptions,
//   ChartData,
// } from 'chart.js';
// import { Bar, Line } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale, 
//   LinearScale, 
//   PointElement, 
//   LineElement, 
//   BarElement,
//   Title, 
//   Tooltip, 
//   Legend
// );

// export interface GraphComponentProps {
//   efficiencyGraph?: { labels: string[]; values: number[] };
//   distanceGraph?: { labels: string[]; values: number[] };
//   distancePerDayGraph?: { labels: string[]; values: number[] };
//   litersGraph?: { labels: string[]; values: number[] };
//   costGraph?: { labels: string[]; values: number[] };
//   priceGraph?: { labels: string[]; values: number[] };
//   chartType?: 'bar' | 'line';
//   maxDataPoints?: number;
// }

// const GraphComponent: React.FC<GraphComponentProps> = (props) => {
//   // Default to bar chart if not specified
//   const chartType = props.chartType || 'bar';
//   // Default max data points to show
//   const maxDataPoints = props.maxDataPoints || 12;

//   const getChartColor = (key: string): string => {
//     const colors: Record<string, string> = {
//       efficiencyGraph: 'rgb(75, 192, 192)',
//       distanceGraph: 'rgb(54, 162, 235)',
//       distancePerDayGraph: 'rgb(65, 105, 225)',
//       litersGraph: 'rgb(153, 102, 255)',
//       costGraph: 'rgb(255, 99, 132)',
//       priceGraph: 'rgb(255, 159, 64)'
//     };

//     return colors[key as keyof typeof colors] || `rgb(${Math.round(Math.random() * 200)}, ${Math.round(Math.random() * 200)}, ${Math.round(Math.random() * 200)})`;
//   };

//   // Process and aggregate data to limit the number of displayed points
//   const processChartData = (labels: string[] = [], values: number[] = [], maxPoints: number) => {
//     if (labels.length <= maxPoints) {
//       return { labels, values };
//     }

//     // Determine how many points to group together
//     const groupSize = Math.ceil(labels.length / maxPoints);
//     const aggregatedLabels: string[] = [];
//     const aggregatedValues: number[] = [];

//     for (let i = 0; i < labels.length; i += groupSize) {
//       const groupLabels = labels.slice(i, i + groupSize);
//       const groupValues = values.slice(i, i + groupSize);
      
//       // Use the first and last label in the group to create a range
//       const startLabel = groupLabels[0];
//       const endLabel = groupLabels[groupLabels.length - 1];
//       const groupLabel = startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;
      
//       // Calculate average for the group
//       const sum = groupValues.reduce((acc, val) => acc + val, 0);
//       const avg = groupValues.length > 0 ? sum / groupValues.length : 0;
      
//       aggregatedLabels.push(groupLabel);
//       aggregatedValues.push(parseFloat(avg.toFixed(2)));
//     }

//     return { labels: aggregatedLabels, values: aggregatedValues };
//   };

//   // Create two separate functions for bar and line chart data
//   const createBarChartData = (labels: string[] = [], values: number[] = [], label: string, color: string): ChartData<'bar'> => {
//     // Process data to limit number of points
//     const processedData = processChartData(labels, values, maxDataPoints);
    
//     return {
//       labels: processedData.labels.length ? processedData.labels : ['No Data'],
//       datasets: [
//         {
//           label,
//           data: processedData.values.length ? processedData.values : [0],
//           backgroundColor: `${color}99`,
//           borderColor: color,
//           borderWidth: 1,
//           hoverBackgroundColor: color,
//           barThickness: 'flex' as const, 
//           maxBarThickness: 50,
//           categoryPercentage: 0.8,
//           barPercentage: 0.9,
//         },
//       ],
//     };
//   };

//   const createLineChartData = (labels: string[] = [], values: number[] = [], label: string, color: string): ChartData<'line'> => {
//     // Process data to limit number of points
//     const processedData = processChartData(labels, values, maxDataPoints);
    
//     return {
//       labels: processedData.labels.length ? processedData.labels : ['No Data'],
//       datasets: [
//         {
//           label,
//           data: processedData.values.length ? processedData.values : [0],
//           backgroundColor: `${color}99`,
//           borderColor: color,
//           borderWidth: 1,
//           fill: false,
//           tension: 0.1,
//           pointRadius: 4,
//           pointHoverRadius: 6,
//         },
//       ],
//     };
//   };

//   // Create separate options for bar and line charts
//   const barChartOptions: ChartOptions<'bar'> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top' as const,
//         labels: { font: { size: 12 } },
//       },
//       tooltip: {
//         enabled: true,
//         mode: 'index' as const,
//         intersect: false,
//       },
//       title: {
//         display: false,
//         font: {
//           size: 16,
//           weight: 'bold'
//         }
//       }
//     },
//     scales: {
//       x: { 
//         display: true, 
//         grid: { display: false },
//         ticks: {
//           maxRotation: 45,
//           minRotation: 0,
//           autoSkip: true,
//           maxTicksLimit: maxDataPoints,
//           font: {
//             size: 10
//           }
//         }
//       },
//       y: { 
//         display: true, 
//         beginAtZero: true, 
//         grid: { color: 'rgba(0, 0, 0, 0.1)' },
//         title: {
//           display: true,
//           font: {
//             size: 10
//           }
//         },
//         ticks: {
//           font: {
//             size: 10
//           },
//           callback: function(value) {
//             // Format large numbers more nicely
//             if (Math.abs(Number(value)) >= 1000) {
//               return (Number(value) / 1000).toFixed(1) + 'k';
//             }
//             return value;
//           }
//         }
//       },
//     },
//   };

//   const lineChartOptions: ChartOptions<'line'> = {
//     ...barChartOptions,
//     // Add any line-specific options here if needed
//   };

//   const formatTitle = (key: string): string => {
//     return key
//       .replace(/Graph$/, '')
//       .replace(/([a-z])([A-Z])/g, '$1 $2')
//       .split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   };

//   const renderChart = (key: string, data: any) => {
//     if (!data) return null;
    
//     const color = getChartColor(key);
//     const title = formatTitle(key);
    
//     return (
//       <div key={key} className="chart-container">
//         <h3 className="chart-title" style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
//           {title}
//         </h3>
//         <div style={{ height: '300px', width: '100%' }}>
//           {chartType === 'bar' ? (
//             <Bar 
//               data={createBarChartData(data.labels, data.values, title, color)} 
//               options={barChartOptions} 
//             />
//           ) : (
//             <Line 
//               data={createLineChartData(data.labels, data.values, title, color)} 
//               options={lineChartOptions} 
//             />
//           )}
//         </div>
//       </div>
//     );
//   };

//   // If we have only a single graph property passed, render it in full size
//   const singleGraph = Object.entries(props).filter(([key]) => 
//     key !== 'chartType' && key !== 'maxDataPoints').length === 1;

//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       {Object.entries(props).map(([key, data]) => {
//         if (key !== 'chartType' && key !== 'maxDataPoints' && data) {
//           return renderChart(key, data);
//         }
//         return null;
//       })}
//     </div>
//   );
// };

// export default GraphComponent;


import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface GraphComponentProps {
  efficiencyGraph?: { labels: string[]; values: number[] };
  distanceGraph?: { labels: string[]; values: number[] };
  distancePerDayGraph?: { labels: string[]; values: number[] };
  litersGraph?: { labels: string[]; values: number[] };
  costGraph?: { labels: string[]; values: number[] };
  priceGraph?: { labels: string[]; values: number[] };
  chartType?: 'bar' | 'line';
  maxDataPoints?: number;
}

const GraphComponent: React.FC<GraphComponentProps> = (props) => {
  const chartType = props.chartType || 'bar';
  const maxDataPoints = props.maxDataPoints || 12;

  const getChartColor = (key: string): string => {
    const colors: Record<string, string> = {
      efficiencyGraph: 'rgb(75, 192, 192)',
      distanceGraph: 'rgb(54, 162, 235)',
      distancePerDayGraph: 'rgb(65, 105, 225)',
      litersGraph: 'rgb(153, 102, 255)',
      costGraph: 'rgb(255, 99, 132)',
      priceGraph: 'rgb(255, 159, 64)',
    };

    return colors[key as keyof typeof colors] || `rgb(${Math.round(Math.random() * 200)}, ${Math.round(Math.random() * 200)}, ${Math.round(Math.random() * 200)})`;
  };

  const processChartData = (labels: string[] = [], values: number[] = [], maxPoints: number) => {
    if (labels.length <= maxPoints) {
      return { labels, values };
    }

    const groupSize = Math.ceil(labels.length / maxPoints);
    const aggregatedLabels: string[] = [];
    const aggregatedValues: number[] = [];

    for (let i = 0; i < labels.length; i += groupSize) {
      const groupLabels = labels.slice(i, i + groupSize);
      const groupValues = values.slice(i, i + groupSize);

      const startLabel = groupLabels[0];
      const endLabel = groupLabels[groupLabels.length - 1];
      const groupLabel = startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;

      const sum = groupValues.reduce((acc, val) => acc + val, 0);
      const avg = groupValues.length > 0 ? sum / groupValues.length : 0;

      aggregatedLabels.push(groupLabel);
      aggregatedValues.push(parseFloat(avg.toFixed(2)));
    }

    return { labels: aggregatedLabels, values: aggregatedValues };
  };

  const createBarChartData = (labels: string[] = [], values: number[] = [], label: string, color: string): ChartData<'bar'> => {
    const processedData = processChartData(labels, values, maxDataPoints);

    return {
      labels: processedData.labels.length ? processedData.labels : ['No Data'],
      datasets: [
        {
          label,
          data: processedData.values.length ? processedData.values : [0],
          backgroundColor: `${color}99`,
          borderColor: color,
          borderWidth: 1,
          hoverBackgroundColor: color,
          barThickness: 'flex' as const,
          maxBarThickness: 50,
          categoryPercentage: 0.8,
          barPercentage: 0.9,
        },
      ],
    };
  };

  const createLineChartData = (labels: string[] = [], values: number[] = [], label: string, color: string): ChartData<'line'> => {
    const processedData = processChartData(labels, values, maxDataPoints);

    return {
      labels: processedData.labels.length ? processedData.labels : ['No Data'],
      datasets: [
        {
          label,
          data: processedData.values.length ? processedData.values : [0],
          backgroundColor: `${color}99`,
          borderColor: color,
          borderWidth: 1,
          fill: false,
          tension: 0.1,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  };

  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { font: { size: 12 } },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
      title: {
        display: false,
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: { display: false },
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: maxDataPoints,
          font: {
            size: 10,
          },
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        title: {
          display: true,
          font: {
            size: 10,
          },
        },
        ticks: {
          font: {
            size: 10,
          },
          callback: function (value) {
            if (Math.abs(Number(value)) >= 1000) {
              return (Number(value) / 1000).toFixed(1) + 'k';
            }
            return value;
          },
        },
      },
    },
  };

  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { font: { size: 12 } },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
      title: {
        display: false,
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: { display: false },
        ticks: {
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: maxDataPoints,
          font: {
            size: 10,
          },
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        title: {
          display: true,
          font: {
            size: 10,
          },
        },
        ticks: {
          font: {
            size: 10,
          },
          callback: function (value) {
            if (Math.abs(Number(value)) >= 1000) {
              return (Number(value) / 1000).toFixed(1) + 'k';
            }
            return value;
          },
        },
      },
    },
  };

  const formatTitle = (key: string): string => {
    return key
      .replace(/Graph$/, '')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const renderChart = (key: string, data: any) => {
    if (!data) return null;

    const color = getChartColor(key);
    const title = formatTitle(key);

    return (
      <div key={key} className="chart-container">
        <h3 className="chart-title" style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
          {title}
        </h3>
        <div style={{ height: '300px', width: '100%' }}>
          {chartType === 'bar' ? (
            <Bar data={createBarChartData(data.labels, data.values, title, color)} options={barChartOptions} />
          ) : (
            <Line data={createLineChartData(data.labels, data.values, title, color)} options={lineChartOptions} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {Object.entries(props).map(([key, data]) => {
        if (key !== 'chartType' && key !== 'maxDataPoints' && data) {
          return renderChart(key, data);
        }
        return null;
      })}
    </div>
  );
};

export default GraphComponent;
