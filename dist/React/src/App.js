"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//BrowserRouter-component that provides the routing functionality
//Route - Defines a single route in the application. It specifies which component should be rendered when the URL matches a specific path.
//Routes - A container for all the Route components. It manages the routing logic and renders the correct Route based on the current path.
const react_router_dom_1 = require("react-router-dom"); // No need to import Router here
const ServicePage_1 = __importDefault(require("./pages/Service/ServicePage"));
const AddServicePage_1 = __importDefault(require("./pages/Service/AddServicePage"));
const EditServicePage_1 = __importDefault(require("./pages/Service/EditServicePage"));
const RefuelingPage_1 = __importDefault(require("./pages/Refueling/RefuelingPage")); // Import RefuelingPage
const AddRefuelingPage_1 = __importDefault(require("./pages/Refueling/AddRefuelingPage")); // Import AddRefuelingPage
const EditRefuelingPage_1 = __importDefault(require("./pages/Refueling/EditRefuelingPage")); // Import EditRefuelingPage
const CarsPage_1 = __importDefault(require("./pages/Cars/CarsPage")); // Import CarsPage
const AddCarPage_1 = __importDefault(require("./pages/Cars/AddCarPage")); // Import AddCarPage
const EditCarPage_1 = __importDefault(require("./pages/Cars/EditCarPage")); // Import EditCarPage
const FuelStatisticsPage_1 = __importDefault(require("./pages/FuelStatisticsPage")); // Import your FuelStatisticsPage
const OdometerUpdatedPage_1 = __importDefault(require("./pages/Cars/OdometerUpdatedPage"));
const AddReminderPage_1 = __importDefault(require("./pages/Reminders/AddReminderPage"));
const EditReminderPage_1 = __importDefault(require("./pages/Reminders/EditReminderPage"));
const ReminderPage_1 = __importDefault(require("./pages/Reminders/ReminderPage"));
const react_1 = __importDefault(require("react"));
require("./app.css");
function App() {
    return (react_1.default.createElement(react_router_dom_1.Routes, null,
        react_1.default.createElement(react_router_dom_1.Route, { path: "/services", element: react_1.default.createElement(ServicePage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/services/add", element: react_1.default.createElement(AddServicePage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/services/edit/:id", element: react_1.default.createElement(EditServicePage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/refuels", element: react_1.default.createElement(RefuelingPage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/refuels/add", element: react_1.default.createElement(AddRefuelingPage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/refuels/edit/:id", element: react_1.default.createElement(EditRefuelingPage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/cars", element: react_1.default.createElement(CarsPage_1.default, null) }),
        " ",
        react_1.default.createElement(react_router_dom_1.Route, { path: "/cars/add", element: react_1.default.createElement(AddCarPage_1.default, null) }),
        " ",
        react_1.default.createElement(react_router_dom_1.Route, { path: "/cars/edit/:id", element: react_1.default.createElement(EditCarPage_1.default, null) }),
        " ",
        react_1.default.createElement(react_router_dom_1.Route, { path: "/cars/odometer/:licensePlate", element: react_1.default.createElement(OdometerUpdatedPage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/fuel-statistics", element: react_1.default.createElement(FuelStatisticsPage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/reminders", element: react_1.default.createElement(ReminderPage_1.default, null) }),
        " ",
        react_1.default.createElement(react_router_dom_1.Route, { path: "/reminders/add", element: react_1.default.createElement(AddReminderPage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/reminders/edit/:id", element: react_1.default.createElement(EditReminderPage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(react_router_dom_1.Navigate, { to: "/services" }) })));
}
exports.default = App;
