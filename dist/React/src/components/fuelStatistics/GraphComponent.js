"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const chart_js_1 = require("chart.js");
const react_chartjs_2_1 = require("react-chartjs-2");
chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.PointElement, chart_js_1.LineElement, chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend);
const GraphComponent = (props) => {
    const createChartData = (labels = [], values = [], label, color) => ({
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
                position: 'top', // Use 'as const' for string literals
                labels: { font: { size: 12 } },
            },
            tooltip: {
                enabled: true,
                mode: 'index', // Use 'as const' to ensure the type matches the expected values
                intersect: false,
            },
        },
        scales: {
            x: { display: true, grid: { display: false } },
            y: { display: true, beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.1)' } },
        },
    };
    return (react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 p-4" }, Object.entries(props).map(([key, data], index) => {
        if (data) {
            return (react_1.default.createElement("div", { key: index, className: "w-full h-80 mb-8 p-4 border rounded-lg shadow-sm" },
                react_1.default.createElement("h3", { className: "text-lg font-semibold mb-4" }, key.replace(/Graph$/, '').replace(/([a-z])([A-Z])/g, '$1 $2')),
                react_1.default.createElement("div", { className: "w-full h-64" },
                    react_1.default.createElement(react_chartjs_2_1.Line, { data: createChartData(data.labels, data.values, key, `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`), options: chartOptions }))));
        }
        return null;
    })));
};
exports.default = GraphComponent;
