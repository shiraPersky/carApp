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
const ServiceDetails = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [service, setService] = (0, react_1.useState)(null);
    const [services, setServices] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchServices = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/services'); // Fetch all services
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                const data = yield response.json();
                setServices(data);
            }
            catch (error) {
                console.error('Error fetching services:', error);
            }
        });
        fetchServices();
    }, []); // Fetch all services once on component mount
    (0, react_1.useEffect)(() => {
        // Once services are fetched, find the service that matches the ID
        if (id && services.length > 0) {
            const foundService = services.find((service) => service.id === Number(id));
            setService(foundService || null);
        }
    }, [id, services]);
    // Handle delete operation
    const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, serviceApi_1.deleteService)(Number(id)); // Call deleteService function
            navigate('/services');
        }
        catch (error) {
            console.error('Error deleting service:', error);
        }
    });
    if (!service)
        return react_2.default.createElement("div", null, "Loading...");
    return (react_2.default.createElement("div", null,
        react_2.default.createElement("h2", null, "Service Details"),
        react_2.default.createElement("p", null,
            "Service Type: ",
            service.service_type),
        react_2.default.createElement("p", null,
            "License Plate: ",
            service.license_plate),
        react_2.default.createElement("p", null,
            "Date: ",
            new Date(service.date).toLocaleDateString()),
        react_2.default.createElement("p", null,
            "Odometer: ",
            service.odometer),
        react_2.default.createElement("p", null,
            "Place: ",
            service.place),
        react_2.default.createElement("p", null,
            "Driver: ",
            service.driver),
        react_2.default.createElement("p", null,
            "Payment Method: ",
            service.payment_method),
        react_2.default.createElement("p", null,
            "Cost: ",
            service.cost),
        react_2.default.createElement("p", null,
            "Notes: ",
            service.notes),
        react_2.default.createElement("div", null,
            react_2.default.createElement(react_router_dom_1.Link, { to: `/services/edit/${service.id}` }, "Edit"),
            react_2.default.createElement("button", { onClick: handleDelete }, "Delete"))));
};
exports.default = ServiceDetails;
