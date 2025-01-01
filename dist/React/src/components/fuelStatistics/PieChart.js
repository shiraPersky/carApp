"use strict";
//render the pie chart for frequent refueling stations
// import React from 'react';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const PieChart = ({ data }: { data: any }) => {
//   return (
//     <div>
//       {/* Use a charting library like Chart.js or Recharts for pie chart */}
//       <p>Pie chart data goes here</p>
//     </div>
//   );
// };
// export default PieChart;
const react_1 = __importDefault(require("react"));
const recharts_1 = require("recharts");
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const PieChart = ({ data }) => {
    if (!data || data.length === 0) {
        return react_1.default.createElement("div", { className: "text-gray-500" }, "No station data available");
    }
    // Transform the data to include a percentage calculation
    const total = data.reduce((sum, entry) => sum + entry.count, 0);
    const formattedData = data.map((entry, index) => ({
        name: entry.station,
        value: entry.count,
        percentage: ((entry.count / total) * 100).toFixed(1)
    }));
    return (react_1.default.createElement("div", { className: "w-full flex flex-col items-center" },
        react_1.default.createElement(recharts_1.PieChart, { width: 400, height: 400 },
            react_1.default.createElement(recharts_1.Pie, { data: formattedData, cx: "50%", cy: "50%", labelLine: true, label: ({ name, percentage }) => `${name} (${percentage}%)`, outerRadius: 150, fill: "#8884d8", dataKey: "value" }, formattedData.map((entry, index) => (react_1.default.createElement(recharts_1.Cell, { key: `cell-${index}`, fill: COLORS[index % COLORS.length] })))),
            react_1.default.createElement(recharts_1.Tooltip, { formatter: (value, name) => [`${value} visits`, name] }),
            react_1.default.createElement(recharts_1.Legend, null)),
        react_1.default.createElement("div", { className: "mt-4 text-sm text-center" },
            react_1.default.createElement("p", { className: "text-gray-600" },
                "Total visits: ",
                total))));
};
exports.default = PieChart;
