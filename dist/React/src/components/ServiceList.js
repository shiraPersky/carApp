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
const serviceApi_1 = require("../services/serviceApi");
const react_2 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ServiceList = () => {
    const [services, setServices] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchServices = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = yield (0, serviceApi_1.getServices)();
                setServices(data);
            }
            catch (error) {
                console.error('Error fetching services:', error);
            }
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
        react_2.default.createElement("div", { className: "service-grid" },
            services.map((service) => {
                console.log(service); // Log the service object to check if all fields are available
                return (react_2.default.createElement("div", { key: service.id, className: "service-card" },
                    react_2.default.createElement(react_router_dom_1.Link, { to: `/services/details/${service.id}` },
                        react_2.default.createElement("h3", null, service.service_type),
                        react_2.default.createElement("p", null,
                            "Date: ",
                            new Date(service.date).toLocaleDateString()),
                        react_2.default.createElement("p", null,
                            "Cost: ",
                            service.cost),
                        react_2.default.createElement("p", null,
                            "Car ID: ",
                            service.car_id),
                        react_2.default.createElement("p", null,
                            "Time: ",
                            service.time),
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
                            service.paymentMethod),
                        react_2.default.createElement("p", null,
                            "File Attachment: ",
                            service.file_attachment),
                        react_2.default.createElement("p", null,
                            "Notes: ",
                            service.notes)),
                    react_2.default.createElement("button", { onClick: () => handleDelete(service.id) }, "Delete")));
            }),
            react_2.default.createElement("div", { className: "service-card add-button" },
                react_2.default.createElement(react_router_dom_1.Link, { to: "/services/add" }, "+")))));
};
exports.default = ServiceList;
