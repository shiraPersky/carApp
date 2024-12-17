"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ServiceForm_1 = __importDefault(require("../components/ServiceForm"));
const serviceApi_1 = require("../services/serviceApi");
const EditServicePage = () => {
    const { id } = (0, react_router_dom_1.useParams)(); // Get the service ID from the URL
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [service, setService] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [services, setServices] = (0, react_1.useState)([]);
    // Fetch all services and then find the specific one by ID
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
    // Once services are fetched, find the specific service by ID
    (0, react_1.useEffect)(() => {
        if (id && services.length > 0) {
            const foundService = services.find((service) => service.id === Number(id));
            setService(foundService || null);
            setLoading(false); // Stop loading when the service is found
        }
    }, [id, services]); // Only run when services or id change
    // Handle form submission
    const handleSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, serviceApi_1.updateService)(Number(id), data);
            navigate('/services'); // Navigate back to the services list
        }
        catch (error) {
            console.error('Error updating service:', error);
        }
    });
    if (loading)
        return react_1.default.createElement("div", null, "Loading..."); // Show loading while fetching data
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Edit Service"),
        react_1.default.createElement(ServiceForm_1.default, { existingService: service, onSubmit: handleSubmit })));
};
exports.default = EditServicePage;
