"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css"); // Your global CSS
const App_1 = __importDefault(require("./App")); // Importing App component
const react_router_dom_1 = require("react-router-dom"); // Router for navigation
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement(App_1.default, null)));
