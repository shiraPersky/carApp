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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const RefuelingForm_1 = __importDefault(require("../../components/Refueling/RefuelingForm"));
const serviceApi_1 = require("../../services/serviceApi");
const EditRefuelingPage = () => {
    const { id } = (0, react_router_dom_1.useParams)(); // Get the refuel ID from the URL
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [refuel, setRefuel] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [refuels, setRefuels] = (0, react_1.useState)([]);
    // Fetch all refuels and then find the specific one by ID
    (0, react_1.useEffect)(() => {
        const fetchRefuels = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/refuels'); // Fetch all refuels
                if (!response.ok) {
                    throw new Error('Failed to fetch refuels');
                }
                const data = yield response.json();
                setRefuels(data);
            }
            catch (error) {
                console.error('Error fetching refuels:', error);
            }
        });
        fetchRefuels();
    }, []); // Fetch all refuels once on component mount
    // Once refuels are fetched, find the specific refuel by ID
    (0, react_1.useEffect)(() => {
        if (id && refuels.length > 0) {
            const foundRefuel = refuels.find((refuel) => refuel.id === Number(id));
            setRefuel(foundRefuel || null);
            setLoading(false); // Stop loading when the refuel is found
        }
    }, [id, refuels]); // Only run when refuels or id change
    // Handle form submission
    const handleSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Submitting update with data:", data); // Tests-Log data being sent to API
        try {
            const { id } = data, refuelData = __rest(data, ["id"]); // Remove id from data if it's part of the form data
            yield (0, serviceApi_1.updateRefuel)(Number(id), data); // Update the refuel by ID
            navigate('/refuels'); // Navigate back to the refuels list
        }
        catch (error) {
            console.error('Error updating refuel:', error);
        }
    });
    if (loading)
        return react_1.default.createElement("div", null, "Loading..."); // Show loading while fetching data
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "Edit Refuel"),
        react_1.default.createElement(RefuelingForm_1.default, { existingRefuel: refuel, onSubmit: handleSubmit })));
};
exports.default = EditRefuelingPage;
