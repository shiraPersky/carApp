"use strict";
//API calls to interact with the backend
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
exports.deleteService = exports.updateService = exports.createService = exports.getAllServices = void 0;
const api_1 = __importDefault(require("./api"));
// Get all services
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api_1.default.get('/');
    return response.data;
});
exports.getAllServices = getAllServices;
// Create a new service
const createService = (service) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api_1.default.post('/', service);
    return response.data;
});
exports.createService = createService;
// Update a service by ID
const updateService = (id, service) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api_1.default.put(`/${id}`, service);
    return response.data;
});
exports.updateService = updateService;
// Delete a service by ID
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield api_1.default.delete(`/${id}`);
});
exports.deleteService = deleteService;
