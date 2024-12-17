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
const react_1 = require("react"); // To manage the state and side effects.
const react_router_dom_1 = require("react-router-dom"); // To navigate and get the service ID from the URL.
const serviceApi_1 = require("../services/serviceApi"); // To interact with the backend to fetch and update the service.
const ServiceForm_1 = __importDefault(require("../components/ServiceForm")); // Assuming you have a form component for editing the service
const react_2 = __importDefault(require("react"));
const EditServicePage = () => {
    const { id } = (0, react_router_dom_1.useParams)(); // Get the service ID from the URL.
    const navigate = (0, react_router_dom_1.useNavigate)(); // For redirecting after updating the service.
    const [existingService, setExistingService] = (0, react_1.useState)(null); // To store the existing service data.
    // Fetch the service details when the component mounts
    (0, react_1.useEffect)(() => {
        const fetchService = () => __awaiter(void 0, void 0, void 0, function* () {
            if (id) {
                const serviceData = yield (0, serviceApi_1.getServiceById)(Number(id)); // Fetch the service by ID.
                setExistingService(serviceData); // Set the service data.
            }
        });
        fetchService();
    }, [id]); // Only run when the `id` changes.
    const handleSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (id) {
                yield (0, serviceApi_1.updateService)(Number(id), data); // Update the service.
                navigate('/services'); // Redirect to the services page after success.
            }
        }
        catch (error) {
            console.error('Error updating service:', error);
        }
    });
    if (!existingService)
        return react_2.default.createElement("div", null, "Loading..."); // Show loading state while data is being fetched.
    return (react_2.default.createElement("div", null,
        react_2.default.createElement("h2", null, "Edit Service"),
        react_2.default.createElement(ServiceForm_1.default, { existingService: existingService, onSubmit: handleSubmit }),
        " "));
};
exports.default = EditServicePage;
