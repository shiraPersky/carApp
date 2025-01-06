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
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const RefuelingForm_1 = __importDefault(require("../../components/Refueling/RefuelingForm"));
const serviceApi_1 = require("../../services/serviceApi");
const AddRefuelingPage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    // Handle form submission
    const handleSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Form data being sent:', data); // Log the data to inspect before submitting
        try {
            yield (0, serviceApi_1.createRefuel)(data); // Create a new refuel entry
            navigate('/refuels'); // Navigate back to the refuels list
        }
        catch (error) {
            console.error('Error adding new refuel:', error);
        }
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Add New Refuel"),
        react_1.default.createElement(RefuelingForm_1.default, { onSubmit: handleSubmit })));
};
exports.default = AddRefuelingPage;
