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
const react_hook_form_1 = require("react-hook-form"); //For  simplifies form management, validation, and submission
const serviceApi_1 = require("../services/serviceApi"); //to interact with the backend API for creating and updating services.
const react_router_dom_1 = require("react-router-dom"); //useNavigate-to navigate between pages,useParams-to access dynamic URL parameters(ID)
const react_1 = __importDefault(require("react"));
const ServiceForm = ({ existingService }) => {
    var _a;
    const { register, handleSubmit, formState: { errors } } = (0, react_hook_form_1.useForm)(); //register-to register input field to the form.
    //handleSubmit:function to handle form submission.
    //errors: An object that contains any validation errors for the form fields.
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { id } = (0, react_router_dom_1.useParams)(); //Extracts the id parameter from the URL
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (id) {
                yield (0, serviceApi_1.updateService)(Number(id), data);
            }
            else {
                yield (0, serviceApi_1.createService)(data);
            }
            navigate('/services');
        }
        catch (error) {
            console.error('Error saving service:', error);
        }
    });
    return (react_1.default.createElement("form", { onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", null, "Service Type"),
            react_1.default.createElement("input", Object.assign({}, register('service_type', { required: 'Service type is required' }), { defaultValue: existingService === null || existingService === void 0 ? void 0 : existingService.service_type })),
            errors.service_type && react_1.default.createElement("span", null, (_a = errors.service_type) === null || _a === void 0 ? void 0 : _a.message)),
        react_1.default.createElement("button", { type: "submit" },
            id ? 'Update' : 'Create',
            " Service")));
};
exports.default = ServiceForm;
