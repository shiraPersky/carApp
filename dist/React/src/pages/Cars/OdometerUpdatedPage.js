"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const OdometerForm_1 = __importDefault(require("../../components/Cars/OdometerForm"));
const OdometerUpdatePage = () => {
    const { licensePlate } = (0, react_router_dom_1.useParams)();
    if (!licensePlate) {
        return react_1.default.createElement(react_router_dom_1.Navigate, { to: "/cars", replace: true });
    }
    return (react_1.default.createElement("div", { className: "max-w-2xl mx-auto p-4" },
        react_1.default.createElement("h1", { className: "text-2xl font-bold mb-6" }, "Update Odometer Reading"),
        react_1.default.createElement("p", { className: "text-gray-600 mb-4" },
            "Updating odometer for vehicle: ",
            licensePlate),
        react_1.default.createElement(OdometerForm_1.default, { licensePlate: licensePlate })));
};
exports.default = OdometerUpdatePage;
