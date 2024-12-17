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
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const serviceApi_1 = require("../services/serviceApi");
const react_2 = __importDefault(require("react"));
const ServiceList = () => {
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
        react_2.default.createElement("div", { className: "service-grid" },
            services.map((service) => (react_2.default.createElement("div", { key: service.id, className: "service-card" },
                react_2.default.createElement(react_router_dom_1.Link, { to: `/services/details/${service.id}` },
                    react_2.default.createElement("h3", null, service.service_type),
                    react_2.default.createElement("p", null,
                        "Date: ",
                        new Date(service.date).toLocaleDateString()),
                    react_2.default.createElement("p", null,
                        "Cost: ",
                        service.cost))))),
            react_2.default.createElement("div", { className: "service-card add-button" },
                react_2.default.createElement(react_router_dom_1.Link, { to: "/services/add" }, "+")))));
};
exports.default = ServiceList;
