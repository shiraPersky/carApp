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
const react_2 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios")); // Import axios for making the CSV upload request
const CarList = () => {
    const [cars, setCars] = (0, react_1.useState)([]);
    const [selectedFile, setSelectedFile] = (0, react_1.useState)([]); // Store files as an array
    (0, react_1.useEffect)(() => {
        const fetchCars = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = yield (0, serviceApi_1.getCars)();
                setCars(data);
            }
            catch (error) {
                console.error('Error fetching cars:', error);
            }
        });
        fetchCars();
    }, []);
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, serviceApi_1.deleteCar)(id);
            setCars(cars.filter((car) => car.id !== id));
        }
        catch (error) {
            console.error('Error deleting car:', error);
        }
    });
    const handleFileChange = (event) => {
        if (event.target.files) {
            setSelectedFile(Array.from(event.target.files)); // Store all selected files
        }
    };
    const handleImport = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!selectedFile || selectedFile.length === 0) {
            alert('Please select a file to import.');
            return;
        }
        const formData = new FormData();
        selectedFile.forEach(file => {
            formData.append('files', file); // Append each file to the form data
        });
        try {
            const response = yield axios_1.default.post('/csv/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Cars imported successfully!');
            setCars((prevCars) => [...prevCars, ...response.data.data]); // Update the cars list
        }
        catch (error) {
            console.error('Error importing cars:', error);
            alert('Failed to import cars.');
        }
    });
    return (react_2.default.createElement("div", null,
        react_2.default.createElement("h2", null, "Your Cars"),
        react_2.default.createElement("div", { className: "car-grid" },
            cars.map((car) => {
                console.log(car); // Log the car object to check if all fields are available
                return (react_2.default.createElement("div", { key: car.id, className: "car-card" },
                    react_2.default.createElement(react_router_dom_1.Link, { to: `/cars/details/${car.id}` },
                        react_2.default.createElement("h3", null,
                            car.make,
                            " ",
                            car.model,
                            " (",
                            car.year,
                            ")"),
                        react_2.default.createElement("p", null,
                            "License Plate: ",
                            car.license_plate),
                        react_2.default.createElement("p", null,
                            "Color: ",
                            car.color),
                        react_2.default.createElement("p", null,
                            "Emission Group: ",
                            car.emission_group),
                        react_2.default.createElement("p", null,
                            "Last Test: ",
                            new Date(car.last_test).toLocaleDateString()),
                        react_2.default.createElement("p", null,
                            "Valid Until: ",
                            new Date(car.valid_until).toLocaleDateString())),
                    react_2.default.createElement("button", { onClick: () => handleDelete(car.id) }, "Delete")));
            }),
            react_2.default.createElement("div", { className: "car-card add-button" },
                react_2.default.createElement(react_router_dom_1.Link, { to: "/cars/add" }, "+"))),
        react_2.default.createElement("div", { className: "import-section" },
            react_2.default.createElement("h3", null, "Import Cars"),
            react_2.default.createElement("input", { type: "file", accept: ".csv", onChange: handleFileChange, multiple: true }),
            react_2.default.createElement("button", { onClick: handleImport }, "Import"))));
};
exports.default = CarList;
