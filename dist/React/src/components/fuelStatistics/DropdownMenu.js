"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const DropdownMenu = ({ onTimePeriodChange }) => {
    const [selectedPeriod, setSelectedPeriod] = (0, react_1.useState)('allTime');
    const [customStartDate, setCustomStartDate] = (0, react_1.useState)('');
    const [customEndDate, setCustomEndDate] = (0, react_1.useState)('');
    const handlePeriodChange = (e) => {
        const newPeriod = e.target.value;
        setSelectedPeriod(newPeriod);
        if (newPeriod !== 'customDates') {
            onTimePeriodChange(newPeriod); // For predefined periods, send only the period name
        }
    };
    const handleCustomDateChange = () => {
        if (customStartDate && customEndDate) {
            onTimePeriodChange('customDates', customStartDate, customEndDate);
        }
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("select", { value: selectedPeriod, onChange: handlePeriodChange },
            react_1.default.createElement("option", { value: "allTime" }, "All Time"),
            react_1.default.createElement("option", { value: "thisMonth" }, "This Month"),
            react_1.default.createElement("option", { value: "lastMonth" }, "Last Month"),
            react_1.default.createElement("option", { value: "thisYear" }, "This Year"),
            react_1.default.createElement("option", { value: "lastYear" }, "Last Year"),
            react_1.default.createElement("option", { value: "custom" }, "Custom Date Range")),
        selectedPeriod === 'custom' && (react_1.default.createElement("div", null,
            react_1.default.createElement("input", { type: "date", value: customStartDate, onChange: (e) => setCustomStartDate(e.target.value), placeholder: "Start Date" }),
            react_1.default.createElement("input", { type: "date", value: customEndDate, onChange: (e) => setCustomEndDate(e.target.value), placeholder: "End Date" }),
            react_1.default.createElement("button", { onClick: handleCustomDateChange }, "Apply Date Range")))));
};
exports.default = DropdownMenu;
