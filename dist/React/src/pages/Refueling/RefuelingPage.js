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
const react_router_dom_1 = require("react-router-dom");
const react_2 = __importDefault(require("react"));
const RefuelingPage = () => {
    const [refuels, setRefuels] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const fetchRefuels = () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield (0, serviceApi_1.getRefuels)();
            setRefuels(data);
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
        react_2.default.createElement(react_router_dom_1.Link, { to: "/refuels/add" }, "Add New Refuel"),
        react_2.default.createElement("table", null,
            react_2.default.createElement("thead", null,
                react_2.default.createElement("tr", null,
                    react_2.default.createElement("th", null, "Car ID"),
                    react_2.default.createElement("th", null, "Date"),
                    react_2.default.createElement("th", null, "Time"),
                    react_2.default.createElement("th", null, "Odometer"),
                    react_2.default.createElement("th", null, "Fuel Type"),
                    react_2.default.createElement("th", null, "Price Per Liter"),
                    react_2.default.createElement("th", null, "Total Cost"),
                    react_2.default.createElement("th", null, "Liters"),
                    react_2.default.createElement("th", null, "Gas Station"),
                    react_2.default.createElement("th", null, "Driver"),
                    react_2.default.createElement("th", null, "File Attachment"),
                    react_2.default.createElement("th", null, "Notes"),
                    react_2.default.createElement("th", null, "Actions"))),
            react_2.default.createElement("tbody", null, refuels.map((refuel) => (react_2.default.createElement("tr", { key: refuel.id },
                react_2.default.createElement("td", null, refuel.id),
                react_2.default.createElement("td", null, new Date(refuel.date).toLocaleDateString()),
                react_2.default.createElement("td", null, refuel.time),
                react_2.default.createElement("td", null, refuel.odometer),
                react_2.default.createElement("td", null, refuel.kindOfFuel),
                react_2.default.createElement("td", null, refuel.pricePerLiter),
                react_2.default.createElement("td", null, refuel.totalCost),
                react_2.default.createElement("td", null, refuel.liters),
                react_2.default.createElement("td", null, refuel.gasStation),
                react_2.default.createElement("td", null, refuel.driver),
                react_2.default.createElement("td", null, refuel.file_attachment),
                react_2.default.createElement("td", null, refuel.notes),
                react_2.default.createElement("td", null,
                    react_2.default.createElement(react_router_dom_1.Link, { to: `/refuels/edit/${refuel.id}` }, "Edit"),
                    react_2.default.createElement("button", { onClick: () => handleDelete(refuel.id) }, "Delete")))))))));
};
exports.default = RefuelingPage;
