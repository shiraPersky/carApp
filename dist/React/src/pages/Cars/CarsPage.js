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
    const [selectedCar, setSelectedCar] = (0, react_1.useState)(null); // Selected car for updating odometer
    const [newOdometer, setNewOdometer] = (0, react_1.useState)(null); // New odometer value
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false); // Modal state
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
    const openOdometerModal = (car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };
    const handleUpdateOdometer = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!selectedCar || newOdometer === null)
            return;
        try {
            yield (0, serviceApi_1.updateOdometer)(selectedCar.license_plate, newOdometer); // Call the API to update the odometer
            setCars(cars.map((car) => car.id === selectedCar.id ? Object.assign(Object.assign({}, car), { odometer: newOdometer }) : car)); // Update the car list with the new odometer
            setIsModalOpen(false); // Close the modal
            setSelectedCar(null); // Reset selected car
            setNewOdometer(null); // Reset new odometer
        }
        catch (error) {
            console.error('Error updating odometer:', error);
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
                    react_2.default.createElement("button", { onClick: () => openOdometerModal(car) }, "Update Odometer"),
                    react_2.default.createElement(react_router_dom_1.Link, { to: `/cars/edit/${car.id}` }, "Edit"),
                    " ",
                    react_2.default.createElement("button", { onClick: () => handleDelete(car.id) }, "Delete"),
                    " ")))))),
        isModalOpen && (react_2.default.createElement("div", { className: "modal" },
            react_2.default.createElement("h3", null,
                "Update Odometer for ", selectedCar === null || selectedCar === void 0 ? void 0 :
                selectedCar.make,
                " ", selectedCar === null || selectedCar === void 0 ? void 0 :
                selectedCar.model),
            react_2.default.createElement("p", null,
                "Current Odometer: ", selectedCar === null || selectedCar === void 0 ? void 0 :
                selectedCar.odometer),
            react_2.default.createElement("input", { type: "number", value: newOdometer || '', onChange: (e) => setNewOdometer(Number(e.target.value)), placeholder: "Enter new odometer value" }),
            react_2.default.createElement("button", { onClick: handleUpdateOdometer }, "Update"),
            react_2.default.createElement("button", { onClick: () => setIsModalOpen(false) }, "Cancel")))));
};
exports.default = CarPage;
