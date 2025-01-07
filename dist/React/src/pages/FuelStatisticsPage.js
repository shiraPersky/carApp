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
const serviceApi_1 = require("../services/serviceApi");
const DropdownMenu_1 = __importDefault(require("../components/fuelStatistics/DropdownMenu"));
const FuelStatisticItem_1 = __importDefault(require("../components/fuelStatistics/FuelStatisticItem"));
const GraphComponent_1 = __importDefault(require("../components/fuelStatistics/GraphComponent"));
const PieChart_1 = __importDefault(require("../components/fuelStatistics/PieChart"));
const FuelStatisticsPage = () => {
    const [statistics, setStatistics] = (0, react_1.useState)(null);
    const [timePeriod, setTimePeriod] = (0, react_1.useState)('allTime');
    const [startDate, setStartDate] = (0, react_1.useState)('');
    const [endDate, setEndDate] = (0, react_1.useState)('');
    //const [graphData, setGraphData] = useState<any>(null);  // State to store graph data
    const [graphData, setGraphData] = (0, react_1.useState)({}); // Define as GraphComponentProps
    (0, react_1.useEffect)(() => {
        function fetchStatistics() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const queryTimePeriod = normalizeTimePeriod(timePeriod);
                    const response = yield (0, serviceApi_1.getFuelStatistics)(queryTimePeriod, startDate, endDate);
                    const currentDate = new Date().toISOString();
                    const enhancedResponse = Object.assign(Object.assign({}, response), { efficiencyGraph: [{ date: currentDate, efficiency: response.averageFuelEfficiency }], distanceGraph: [{ date: currentDate, distance: response.averageDistanceBetweenFillups }], distancePerDayGraph: [{ date: currentDate, distancePerDay: response.averageDistancePerDay }], litersGraph: [{ date: currentDate, liters: response.averageLitersPerFillup }], costGraph: [{ date: currentDate, cost: response.averageTotalCostPerFillup }], priceGraph: [{ date: currentDate, price: response.averagePricePerLiter }] });
                    setStatistics(enhancedResponse);
                }
                catch (error) {
                    console.error("Error fetching statistics:", error);
                }
            });
        }
        fetchStatistics();
    }, [timePeriod, startDate, endDate]);
    // Fetching the graph data as a separate side effect
    (0, react_1.useEffect)(() => {
        const fetchGraphData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:3000/fuel-statistics/graph-data?timePeriod=${normalizeTimePeriod(timePeriod)}`);
                const data = yield response.json();
                const mappedGraphData = {
                    efficiencyGraph: mapGraphData(data.efficiencyGraph),
                    distanceGraph: mapGraphData(data.distanceGraph),
                    distancePerDayGraph: mapGraphData(data.distancePerDayGraph),
                    litersGraph: mapGraphData(data.litersGraph),
                    costGraph: mapGraphData(data.costGraph),
                    priceGraph: mapGraphData(data.priceGraph),
                };
                setGraphData(mappedGraphData); // Update the state with the graph data
            }
            catch (error) {
                console.error("Error fetching graph data:", error);
            }
        });
        fetchGraphData();
    }, [timePeriod, startDate, endDate]); // Refetch graph data when time period or dates change
    const handleApplyDateRange = () => {
        if (startDate && endDate) {
            setTimePeriod('customDates');
        }
    };
    const normalizeTimePeriod = (timePeriod) => {
        switch (timePeriod) {
            case 'allTime':
                return 'All Time';
            case 'thisMonth':
                return 'This Month';
            case 'lastMonth':
                return 'Last Month';
            case 'thisYear':
                return 'This Year';
            case 'lastYear':
                return 'Last Year';
            case 'customDates':
                if (startDate && endDate) {
                    return `Custom Dates|${startDate}|${endDate}`;
                }
                return 'All Time';
            default:
                return timePeriod.replace(/([a-z])([A-Z])/g, '$1 $2')
                    .replace(/^./, str => str.toUpperCase());
        }
    };
    const formatNumber = (num) => {
        if (num === undefined || num === null)
            return '-';
        return num.toFixed(2);
    };
    const mapGraphData = (graphData) => {
        if (!graphData || !Array.isArray(graphData)) {
            console.log("Invalid graph data:", graphData);
            return { labels: ['Current'], values: [0] };
        }
        const labels = graphData.map(item => {
            const date = new Date(item.date);
            return date.toLocaleDateString();
        });
        const values = graphData.map(item => {
            var _a, _b, _c, _d, _e, _f;
            return Number((_f = (_e = (_d = (_c = (_b = (_a = item.efficiency) !== null && _a !== void 0 ? _a : item.distance) !== null && _b !== void 0 ? _b : item.distancePerDay) !== null && _c !== void 0 ? _c : item.liters) !== null && _d !== void 0 ? _d : item.cost) !== null && _e !== void 0 ? _e : item.price) !== null && _f !== void 0 ? _f : 0);
        });
        return { labels, values };
    };
    const statisticsWithMappedGraphs = statistics ? {
        efficiencyGraph: mapGraphData(statistics.efficiencyGraph),
        distanceGraph: mapGraphData(statistics.distanceGraph),
        distancePerDayGraph: mapGraphData(statistics.distancePerDayGraph),
        litersGraph: mapGraphData(statistics.litersGraph),
        costGraph: mapGraphData(statistics.costGraph),
        priceGraph: mapGraphData(statistics.priceGraph)
    } : {};
    const handleTimePeriodChange = (newTimePeriod, start, end) => {
        setTimePeriod(newTimePeriod);
        if (start && end) {
            setStartDate(start);
            setEndDate(end);
        }
        else {
            setStartDate('');
            setEndDate('');
        }
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Fuel Statistics"),
        react_1.default.createElement(DropdownMenu_1.default, { onTimePeriodChange: handleTimePeriodChange }),
        react_1.default.createElement("div", null, statistics && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", null,
                react_1.default.createElement("h2", null, "Statistics Overview"),
                react_1.default.createElement(FuelStatisticItem_1.default, { title: "Average Fuel Efficiency (km/L)", value: formatNumber(statistics.averageFuelEfficiency) }),
                react_1.default.createElement(FuelStatisticItem_1.default, { title: "Average Distance Between Fill-ups (km)", value: formatNumber(statistics.averageDistanceBetweenFillups) }),
                react_1.default.createElement(FuelStatisticItem_1.default, { title: "Average distance per day (km)", value: formatNumber(statistics.averageDistancePerDay) }),
                react_1.default.createElement(FuelStatisticItem_1.default, { title: "Average liters per fill up (liters)", value: formatNumber(statistics.averageLitersPerFillup) }),
                react_1.default.createElement(FuelStatisticItem_1.default, { title: "Average cost per fill up (NIS)", value: formatNumber(statistics.averageTotalCostPerFillup) }),
                react_1.default.createElement(FuelStatisticItem_1.default, { title: "Average price per liter (NIS)", value: formatNumber(statistics.averagePricePerLiter) }),
                react_1.default.createElement(FuelStatisticItem_1.default, { title: "Total fuel cost (NIS)", value: formatNumber(statistics.totalFuelCost) }),
                react_1.default.createElement(FuelStatisticItem_1.default, { title: "Total distance (km)", value: formatNumber(statistics.totalDistance) }),
                react_1.default.createElement(FuelStatisticItem_1.default, { title: "Total liters", value: formatNumber(statistics.totalLiters) }),
                react_1.default.createElement(FuelStatisticItem_1.default, { title: "Average time between refuels", value: statistics.averageTimeBetweenRefuels })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("h2", null, "Graphs"),
                react_1.default.createElement(GraphComponent_1.default, Object.assign({}, graphData))),
            react_1.default.createElement("div", { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '20px' } },
                react_1.default.createElement("h2", { style: { textAlign: 'center', marginBottom: '10px' } }, "Frequent Refueling Stations"),
                react_1.default.createElement(PieChart_1.default, { data: statistics.frequentRefuelingStations })))))));
};
exports.default = FuelStatisticsPage;
