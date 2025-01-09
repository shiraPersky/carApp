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
const ServicesPage = () => {
    const [services, setServices] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchServices = () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield (0, serviceApi_1.getServices)();
            setServices(data);
        });
        fetchServices();
    }, []);
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, serviceApi_1.deleteService)(id);
            setServices(services.filter((service) => service.id !== id));
        }
        catch (error) {
            console.error('Error deleting service:', error);
        }
    });
    return (react_2.default.createElement("div", null,
        react_2.default.createElement("h2", null, "Your Services"),
        react_2.default.createElement(react_router_dom_1.Link, { to: "/services/add" }, "Add New Service"),
        react_2.default.createElement("table", null,
            react_2.default.createElement("thead", null,
                react_2.default.createElement("tr", null,
                    react_2.default.createElement("th", null, "License Plate"),
                    react_2.default.createElement("th", null, "Service Type"),
                    react_2.default.createElement("th", null, "Date"),
                    react_2.default.createElement("th", null, "Cost"),
                    react_2.default.createElement("th", null, "Odometer"),
                    react_2.default.createElement("th", null, "Place"),
                    react_2.default.createElement("th", null, "Driver"),
                    react_2.default.createElement("th", null, "Payment Method"),
                    react_2.default.createElement("th", null, "File Attachment"),
                    react_2.default.createElement("th", null, "Notes"),
                    react_2.default.createElement("th", null, "Actions"))),
            react_2.default.createElement("tbody", null, services.map((service) => (react_2.default.createElement("tr", { key: service.id },
                react_2.default.createElement("td", null, service.service_type),
                react_2.default.createElement("td", null, service.license_plate),
                react_2.default.createElement("td", null, new Date(service.date).toLocaleDateString()),
                react_2.default.createElement("td", null, service.cost),
                react_2.default.createElement("td", null, service.odometer),
                react_2.default.createElement("td", null, service.place),
                react_2.default.createElement("td", null, service.driver),
                react_2.default.createElement("td", null, service.paymentMethod),
                react_2.default.createElement("td", null, service.file_attachment),
                react_2.default.createElement("td", null, service.notes),
                react_2.default.createElement("td", null,
                    react_2.default.createElement(react_router_dom_1.Link, { to: `/services/edit/${service.id}` }, "Edit"),
                    react_2.default.createElement("button", { onClick: () => handleDelete(service.id) }, "Delete")))))))));
};
exports.default = ServicesPage;
