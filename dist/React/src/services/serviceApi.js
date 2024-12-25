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
exports.deleteCar = exports.updateCar = exports.createCar = exports.getCars = exports.deleteRefuel = exports.updateRefuel = exports.createRefuel = exports.getRefuels = exports.deleteService = exports.updateService = exports.createService = exports.getServices = void 0;
const axios_1 = __importDefault(require("axios")); //Axios simplifies making GET, POST, PUT, and DELETE requests to interact with APIs.
const API_URL = 'http://localhost:3000/services'; //service API
const REFUEL_API_URL = 'http://localhost:3000/refuels'; //refuel API
const CAR_API_URL = 'http://localhost:3000/cars'; // Car API
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
// Refuel API Functions (Added)
const getRefuels = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(REFUEL_API_URL); // GET request for refuels
        return response.data; // Return the actual data
    }
    catch (error) {
        throw new Error('Error fetching refuels');
    }
});
exports.getRefuels = getRefuels;
const createRefuel = (refuelData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(REFUEL_API_URL, refuelData); // POST request for refuels
        return response.data;
    }
    catch (error) {
        throw new Error('Error creating refuel');
    }
});
exports.createRefuel = createRefuel;
const updateRefuel = (id, refuelData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.put(`${REFUEL_API_URL}/${id}`, refuelData); // PUT request for refuels
        return response.data;
    }
    catch (error) {
        throw new Error('Error updating refuel');
    }
});
exports.updateRefuel = updateRefuel;
const deleteRefuel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default.delete(`${REFUEL_API_URL}/${id}`); // DELETE request for refuels
    }
    catch (error) {
        throw new Error('Error deleting refuel');
    }
});
exports.deleteRefuel = deleteRefuel;
// Car API Functions
const getCars = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(CAR_API_URL); // GET request for cars
        return response.data; // Return the actual data
    }
    catch (error) {
        throw new Error('Error fetching cars');
    }
});
exports.getCars = getCars;
const createCar = (carData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(CAR_API_URL, carData); // POST request for cars
        return response.data;
    }
    catch (error) {
        throw new Error('Error creating car');
    }
});
exports.createCar = createCar;
const updateCar = (id, carData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.put(`${CAR_API_URL}/${id}`, carData); // PUT request for cars
        return response.data;
    }
    catch (error) {
        throw new Error('Error updating car');
    }
});
exports.updateCar = updateCar;
const deleteCar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default.delete(`${CAR_API_URL}/${id}`); // DELETE request for cars
    }
    catch (error) {
        throw new Error('Error deleting car');
    }
});
exports.deleteCar = deleteCar;
