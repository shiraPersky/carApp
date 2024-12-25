"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//BrowserRouter-component that provides the routing functionality
//Route - Defines a single route in the application. It specifies which component should be rendered when the URL matches a specific path.
//Routes - A container for all the Route components. It manages the routing logic and renders the correct Route based on the current path.
const react_router_dom_1 = require("react-router-dom"); // No need to import Router here
const ServicePage_1 = __importDefault(require("./pages/ServicePage"));
const AddServicePage_1 = __importDefault(require("./pages/AddServicePage"));
const EditServicePage_1 = __importDefault(require("./pages/EditServicePage"));
const RefuelingPage_1 = __importDefault(require("./pages/RefuelingPage")); // Import RefuelingPage
const AddRefuelingPage_1 = __importDefault(require("./pages/AddRefuelingPage")); // Import AddRefuelingPage
const EditRefuelingPage_1 = __importDefault(require("./pages/EditRefuelingPage")); // Import EditRefuelingPage
const CarsPage_1 = __importDefault(require("./pages/CarsPage")); // Import CarsPage
const AddCarPage_1 = __importDefault(require("./pages/AddCarPage")); // Import AddCarPage
const EditCarPage_1 = __importDefault(require("./pages/EditCarPage")); // Import EditCarPage
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
        react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(react_router_dom_1.Navigate, { to: "/services" }) })));
}
exports.default = App;
