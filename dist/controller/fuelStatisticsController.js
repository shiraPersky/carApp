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
Object.defineProperty(exports, "__esModule", { value: true });
const fuelStatisticsService_js_1 = require("../services/fuelStatisticsService.js");
const fuelStatisticsService = new fuelStatisticsService_js_1.FuelStatisticsService();
const fuelStatisticsController = {
    getStatistics: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Set "All Time" as the default if no timePeriod is provided
            const timePeriod = req.query.timePeriod || 'All Time';
            // Get statistics from the service
            const statistics = yield fuelStatisticsService.getStatistics(timePeriod);
            // Create the DTO to format and structure the data
            const dto = {
                averageFuelEfficiency: statistics.averageEfficiency,
                averageDistanceBetweenFillups: statistics.averageDistanceBetweenFillups,
                averageDistancePerDay: statistics.averageDistancePerDay,
                averageLitersPerFillup: statistics.averageLitersPerFill,
                averageTotalCostPerFillup: statistics.averageCostPerFill,
                averagePricePerLiter: statistics.averagePricePerLiter,
                totalFuelCost: statistics.totalCost,
                totalDistance: statistics.totalDistance,
                totalLiters: statistics.totalLiters,
                frequentRefuelingStations: [], // This will be populated later in the service layer
                averageTimeBetweenRefuels: statistics.averageTimeBetweenRefuels, // This could be computed from the data
            };
            const frequentStations = yield fuelStatisticsService.getFrequentStations();
            dto.frequentRefuelingStations = frequentStations;
            // Send the DTO as the response
            res.json(dto);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving fuel statistics', error: error.message });
        }
    }),
    getGraphData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const timePeriod = req.query.timePeriod || 'All Time'; //set all time as default
            const graphData = yield fuelStatisticsService.getGraphData(timePeriod);
            res.json(graphData);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving graph data', error: error.message });
        }
    }),
    getFrequentRefuelingStations: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const stationData = yield fuelStatisticsService.getFrequentStations();
            res.json(stationData);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving station data', error: error.message });
        }
    })
};
exports.default = fuelStatisticsController;
