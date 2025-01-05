"use strict";
// //render the graph based on the selected statistic
// import React from 'react';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const GraphComponent = ({ data }: { data: any }) => {
//   return (
//     <div>
//       {/* Use a charting library like Chart.js or Recharts to render the graph here */}
//       <p>Graph data goes here</p>
//     </div>
//   );
// };
const react_1 = __importDefault(require("react"));
const chart_js_1 = require("chart.js");
const react_chartjs_2_1 = require("react-chartjs-2");
chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.PointElement, chart_js_1.LineElement, chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend);
const GraphComponent = (props) => {
    const createChartData = (labels = [], values = [], label, color) => {
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
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
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
    const renderGraph = (data, title, label, color) => {
        return (react_1.default.createElement("div", { className: "w-full h-80 mb-8 p-4 border rounded-lg shadow-sm" },
            react_1.default.createElement("h3", { className: "text-lg font-semibold mb-4" }, title),
            react_1.default.createElement("div", { className: "w-full h-64" },
                react_1.default.createElement(react_chartjs_2_1.Line, { data: createChartData(data === null || data === void 0 ? void 0 : data.labels, data === null || data === void 0 ? void 0 : data.values, label, color), options: Object.assign(Object.assign({}, chartOptions), { plugins: Object.assign(Object.assign({}, chartOptions.plugins), { title: {
                                display: true,
                                text: title
                            } }) }) }))));
    };
    return (react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 p-4" },
        renderGraph(props.efficiencyGraph, 'Fuel Efficiency Over Time', 'Fuel Efficiency (km/L)', 'rgb(75, 192, 192)'),
        renderGraph(props.distanceGraph, 'Distance Between Fill-ups', 'Distance (km)', 'rgb(54, 162, 235)'),
        renderGraph(props.distancePerDayGraph, 'Distance Per Day', 'Distance (km/day)', 'rgb(255, 206, 86)'),
        renderGraph(props.litersGraph, 'Liters Per Fill-up', 'Liters', 'rgb(153, 102, 255)'),
        renderGraph(props.costGraph, 'Cost Per Fill-up', 'Cost (NIS)', 'rgb(255, 159, 64)'),
        renderGraph(props.priceGraph, 'Price Per Liter', 'Price (NIS)', 'rgb(255, 99, 132)')));
};
exports.default = GraphComponent;
