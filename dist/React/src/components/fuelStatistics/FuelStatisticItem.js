"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//To display each statistic in the list.
const react_1 = __importDefault(require("react"));
const FuelStatisticItem = ({ title, value }) => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h3", null, title),
        react_1.default.createElement("p", null, value)));
};
exports.default = FuelStatisticItem;
