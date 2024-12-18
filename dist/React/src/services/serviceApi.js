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
exports.deleteService = exports.updateService = exports.createService = exports.getServices = void 0;
const axios_1 = __importDefault(require("axios")); //Axios simplifies making GET, POST, PUT, and DELETE requests to interact with APIs.
const API_URL = 'http://localhost:3000/services';
const getServices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(API_URL); //This makes a GET request to the backend API at http://localhost:3000/services.
        return response.data; //return the actual data
    }
    catch (error) {
        throw new Error('Error fetching services');
    }
});
exports.getServices = getServices;
const createService = (serviceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(API_URL, serviceData);
        return response.data;
    }
    catch (error) {
        throw new Error('Error creating service');
    }
});
exports.createService = createService;
const updateService = (id, serviceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.put(`${API_URL}/${id}`, serviceData);
        return response.data;
    }
    catch (error) {
        throw new Error('Error updating service');
    }
});
exports.updateService = updateService;
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default.delete(`${API_URL}/${id}`);
    }
    catch (error) {
        throw new Error('Error deleting service');
    }
});
exports.deleteService = deleteService;
