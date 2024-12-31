"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//render the graph based on the selected statistic
const react_1 = __importDefault(require("react"));
const GraphComponent = ({ data }) => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("p", null, "Graph data goes here")));
};
exports.default = GraphComponent;
