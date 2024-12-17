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
const react_router_dom_1 = require("react-router-dom"); //allows you to access the dynamic URL parameters (ID)
const serviceApi_1 = require("../services/serviceApi"); //fetches all services from the backend API.
const react_2 = __importDefault(require("react"));
const ServiceDetails = () => {
    const [service, setService] = (0, react_1.useState)(null); //update the service state.
    const { id } = (0, react_router_dom_1.useParams)();
    (0, react_1.useEffect)(() => {
        const fetchService = () => __awaiter(void 0, void 0, void 0, function* () {
            const services = yield (0, serviceApi_1.getServices)();
            const serviceDetails = services.find((s) => s.id === Number(id));
            setService(serviceDetails);
        });
        fetchService();
    }, [id]);
    //This line checks if the service state is null. If it is, it means the service details haven't been loaded yet, so the component returns a "Loading..." message.
    if (!service)
        return react_2.default.createElement("div", null, "Loading...");
    return (react_2.default.createElement("div", null,
        react_2.default.createElement("h2", null, "Service Details"),
        react_2.default.createElement("p", null,
            "Service Type: ",
            service.service_type)));
};
exports.default = ServiceDetails;
