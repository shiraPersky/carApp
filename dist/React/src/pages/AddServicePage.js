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
const serviceApi_1 = require("../services/serviceApi"); // To interact with the backend to create a new service.
const react_router_dom_1 = require("react-router-dom"); // To navigate the user back to the services list after adding a new service.
const ServiceForm_1 = __importDefault(require("../components/ServiceForm")); // Assuming you have this component for form handling
const react_1 = __importDefault(require("react"));
const AddServicePage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)(); // To navigate after the service is added.
    const handleSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, serviceApi_1.createService)(data); // Make an API call to create the service.
            navigate('/services'); // Redirect back to the services page after success.
        }
        catch (error) {
            console.error('Error adding service:', error);
        }
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Add New Service"),
        react_1.default.createElement(ServiceForm_1.default, { onSubmit: handleSubmit }),
        " "));
};
exports.default = AddServicePage;
