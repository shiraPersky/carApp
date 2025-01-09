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
const react_1 = require("react");
const serviceApi_1 = require("../../services/serviceApi");
const react_2 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const RefuelingList = () => {
    const [refuels, setRefuels] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchRefuels = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = yield (0, serviceApi_1.getRefuels)();
                setRefuels(data);
            }
            catch (error) {
                console.error('Error fetching refuels:', error);
            }
        });
        fetchRefuels();
    }, []);
    const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, serviceApi_1.deleteRefuel)(id);
            setRefuels(refuels.filter((refuel) => refuel.id !== id));
        }
        catch (error) {
            console.error('Error deleting refuel:', error);
        }
    });
    return (react_2.default.createElement("div", null,
        react_2.default.createElement("h2", null, "Your Refuels"),
        react_2.default.createElement("div", { className: "refuel-grid" },
            refuels.map((refuel) => {
                console.log(refuel); // Log the refuel object to check if all fields are available
                return (react_2.default.createElement("div", { key: refuel.id, className: "refuel-card" },
                    react_2.default.createElement(react_router_dom_1.Link, { to: `/refuels/details/${refuel.id}` },
                        react_2.default.createElement("h3", null,
                            refuel.kindOfFuel,
                            " Refuel"),
                        react_2.default.createElement("p", null,
                            "License Plate: ",
                            refuel.license_plate),
                        " ",
                        react_2.default.createElement("p", null,
                            "Date: ",
                            new Date(refuel.date).toLocaleDateString()),
                        react_2.default.createElement("p", null,
                            "Odometer: ",
                            refuel.odometer),
                        react_2.default.createElement("p", null,
                            "Liters: ",
                            refuel.liters),
                        react_2.default.createElement("p", null,
                            "Price per Liter: ",
                            refuel.pricePerLiter),
                        react_2.default.createElement("p", null,
                            "Total Cost: ",
                            refuel.totalCost),
                        react_2.default.createElement("p", null,
                            "Gas Station: ",
                            refuel.gasStation),
                        react_2.default.createElement("p", null,
                            "Driver: ",
                            refuel.driver),
                        react_2.default.createElement("p", null,
                            "Notes: ",
                            refuel.notes)),
                    react_2.default.createElement("button", { onClick: () => handleDelete(refuel.id) }, "Delete")));
            }),
            react_2.default.createElement("div", { className: "refuel-card add-button" },
                react_2.default.createElement(react_router_dom_1.Link, { to: "/refuels/add" }, "+")))));
};
exports.default = RefuelingList;
