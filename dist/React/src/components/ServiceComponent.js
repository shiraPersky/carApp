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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const serviceApi_1 = require("../services/serviceApi");
const ServiceComponent = () => {
    const [services, setServices] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchServices = () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield (0, serviceApi_1.getAllServices)();
            setServices(data);
        });
        fetchServices();
    }, []);
    const addService = () => __awaiter(void 0, void 0, void 0, function* () {
        const newService = {
            car_id: 1,
            date: '2024-12-16',
            time: '10:00 AM',
            odometer: 15000,
            service_type: 'Oil Change',
            place: 'Service Center',
            driver: 'John Doe',
            paymentMethod: 'Credit Card',
            cost: 100,
        };
        const createdService = yield (0, serviceApi_1.createService)(newService);
        setServices([...services, createdService]);
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Car Services"),
        react_1.default.createElement("button", { onClick: addService }, "Add Service"),
        react_1.default.createElement("ul", null, services.map((service) => (react_1.default.createElement("li", { key: service.id },
            service.service_type,
            " - ",
            service.cost,
            " USD"))))));
};
exports.default = ServiceComponent;
