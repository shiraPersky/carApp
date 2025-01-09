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
const serviceApi_1 = require("../../services/serviceApi");
const react_2 = __importDefault(require("react"));
const RefuelingDetails = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [refuel, setRefuel] = (0, react_1.useState)(null);
    const [refuels, setRefuels] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchRefuels = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/refuels'); // Fetch all services
                if (!response.ok) {
                    throw new Error('Failed to fetch refuels');
                }
                const data = yield response.json();
                setRefuels(data);
            }
            catch (error) {
                console.error('Error fetching refuel:', error);
            }
        });
        fetchRefuels();
    }, []); // Fetch all refuels once on component mount
    (0, react_1.useEffect)(() => {
        // Once refuels are fetched, find the refuel that matches the ID
        if (id && refuels.length > 0) {
            const foundRefuel = refuels.find((refuel) => refuel.id === Number(id));
            setRefuel(foundRefuel || null);
        }
    }, [id, refuels]);
    // Handle delete operation
    const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, serviceApi_1.deleteRefuel)(Number(id)); // Call deleteRefuel function
            navigate('/refuels');
        }
        catch (error) {
            console.error('Error deleting refuel:', error);
        }
    });
    if (!refuel)
        return react_2.default.createElement("div", null, "Loading...");
    return (react_2.default.createElement("div", null,
        react_2.default.createElement("h2", null, "Refueling Details"),
        react_2.default.createElement("p", null,
            "License Plate: ",
            refuel.license_plate),
        react_2.default.createElement("p", null,
            "Date: ",
            new Date(refuel.date).toLocaleDateString()),
        react_2.default.createElement("p", null,
            "Time: ",
            new Date(refuel.time).toLocaleTimeString()),
        react_2.default.createElement("p", null,
            "Odometer: ",
            refuel.odometer),
        react_2.default.createElement("p", null,
            "Kind of Fuel: ",
            refuel.kindOfFuel),
        react_2.default.createElement("p", null,
            "Price per Liter: ",
            refuel.pricePerLiter),
        react_2.default.createElement("p", null,
            "Total Cost: ",
            refuel.totalCost),
        react_2.default.createElement("p", null,
            "Liters: ",
            refuel.liters),
        react_2.default.createElement("p", null,
            "Gas Station: ",
            refuel.gasStation),
        react_2.default.createElement("p", null,
            "Driver: ",
            refuel.driver),
        react_2.default.createElement("p", null,
            "Notes: ",
            refuel.notes),
        react_2.default.createElement("div", null,
            react_2.default.createElement(react_router_dom_1.Link, { to: `/refuels/edit/${refuel.id}` }, "Edit"),
            react_2.default.createElement("button", { onClick: handleDelete }, "Delete"))));
};
exports.default = RefuelingDetails;
