"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const serviceApi_1 = require("../../services/serviceApi");
const react_router_dom_1 = require("react-router-dom");
const react_2 = __importDefault(require("react"));
const CarPage = () => {
    const [cars, setCars] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchCars = () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield (0, serviceApi_1.getCars)(); // Fetching the list of cars
            setCars(data);
        });
        fetchCars();
    }, []);
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, serviceApi_1.deleteCar)(id); // Delete the car by ID
            setCars(cars.filter((car) => car.id !== id)); // Remove the deleted car from the state
        }
        catch (error) {
            console.error('Error deleting car:', error);
        }
    });
    return (react_2.default.createElement("div", null,
        react_2.default.createElement("h2", null, "Your Cars"),
        react_2.default.createElement(react_router_dom_1.Link, { to: "/cars/add" }, "Add New Car"),
        react_2.default.createElement("table", null,
            react_2.default.createElement("thead", null,
                react_2.default.createElement("tr", null,
                    react_2.default.createElement("th", null, "Car ID"),
                    react_2.default.createElement("th", null, "License Plate"),
                    react_2.default.createElement("th", null, "Make"),
                    react_2.default.createElement("th", null, "Model"),
                    react_2.default.createElement("th", null, "Year"),
                    react_2.default.createElement("th", null, "Color"),
                    react_2.default.createElement("th", null, "Emission Group"),
                    react_2.default.createElement("th", null, "Valid Until"),
                    react_2.default.createElement("th", null, "Trim Level"),
                    react_2.default.createElement("th", null, "Last Test"),
                    react_2.default.createElement("th", null, "Model Type"),
                    react_2.default.createElement("th", null, "Model Number"),
                    react_2.default.createElement("th", null, "Actions"))),
            react_2.default.createElement("tbody", null, cars.map((car) => (react_2.default.createElement("tr", { key: car.id },
                react_2.default.createElement("td", null, car.id),
                react_2.default.createElement(react_router_dom_1.Link, { to: "/cars/add", className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" }, "Add New Car"),
                react_2.default.createElement("td", null, car.license_plate),
                react_2.default.createElement("td", null, car.make),
                react_2.default.createElement("td", null, car.model),
                react_2.default.createElement("td", null, car.year),
                react_2.default.createElement("td", null, car.color),
                react_2.default.createElement("td", null, car.emission_group),
                react_2.default.createElement("td", null, new Date(car.valid_until).toLocaleDateString()),
                react_2.default.createElement("td", null, car.trim_level),
                react_2.default.createElement("td", null, new Date(car.last_test).toLocaleDateString()),
                react_2.default.createElement("td", null, car.model_type),
                react_2.default.createElement("td", null, car.model_number),
                react_2.default.createElement("td", null,
                    react_2.default.createElement(react_router_dom_1.Link, { to: `/cars/edit/${car.id}` }, "Edit"),
                    " ",
                    react_2.default.createElement("button", { onClick: () => handleDelete(car.id) }, "Delete"),
                    " "))))))));
};
exports.default = CarPage;
