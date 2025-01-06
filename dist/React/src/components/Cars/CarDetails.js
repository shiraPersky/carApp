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
const react_router_dom_1 = require("react-router-dom");
const serviceApi_1 = require("../../services/serviceApi"); // Ensure you have the deleteCar function
const react_2 = __importDefault(require("react"));
const CarDetails = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [car, setCar] = (0, react_1.useState)(null);
    const [cars, setCars] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchCars = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/cars'); // Fetch all cars
                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }
                const data = yield response.json();
                setCars(data);
            }
            catch (error) {
                console.error('Error fetching cars:', error);
            }
        });
        fetchCars();
    }, []); // Fetch all cars once on component mount
    (0, react_1.useEffect)(() => {
        // Once cars are fetched, find the car that matches the ID
        if (id && cars.length > 0) {
            const foundCar = cars.find((car) => car.id === Number(id));
            setCar(foundCar || null);
        }
    }, [id, cars]);
    // Handle delete operation
    const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, serviceApi_1.deleteCar)(Number(id)); // Call deleteCar function
            navigate('/cars');
        }
        catch (error) {
            console.error('Error deleting car:', error);
        }
    });
    if (!car)
        return react_2.default.createElement("div", null, "Loading...");
    return (react_2.default.createElement("div", null,
        react_2.default.createElement("h2", null, "Car Details"),
        react_2.default.createElement("p", null,
            "License Plate: ",
            car.license_plate),
        react_2.default.createElement("p", null,
            "Make: ",
            car.make),
        react_2.default.createElement("p", null,
            "Model: ",
            car.model),
        react_2.default.createElement("p", null,
            "Year: ",
            car.year),
        react_2.default.createElement("p", null,
            "Color: ",
            car.color),
        react_2.default.createElement("p", null,
            "Emission Group: ",
            car.emission_group || 'N/A'),
        react_2.default.createElement("p", null,
            "Valid Until: ",
            new Date(car.valid_until).toLocaleDateString()),
        react_2.default.createElement("p", null,
            "Trim Level: ",
            car.trim_level || 'N/A'),
        react_2.default.createElement("p", null,
            "Last Test: ",
            new Date(car.last_test).toLocaleDateString()),
        react_2.default.createElement("p", null,
            "Model Type: ",
            car.model_type),
        react_2.default.createElement("p", null,
            "Model Number: ",
            car.model_number),
        react_2.default.createElement("div", null,
            react_2.default.createElement(react_router_dom_1.Link, { to: `/cars/edit/${car.id}` }, "Edit"),
            react_2.default.createElement("button", { onClick: handleDelete }, "Delete"))));
};
exports.default = CarDetails;
