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
exports.VehicleService = void 0;
const axios_1 = __importDefault(require("axios"));
class VehicleService {
    // Function to fetch and search CSV data from data.gov.il
    findCarInRemoteCSV(licensePlate) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield axios_1.default.get('https://data.gov.il/api/3/action/datastore_search', {
                    params: {
                        resource_id: '053cea08-09bc-40ec-8f7a-156f0677aff3',
                        q: licensePlate,
                        limit: 1
                    }
                });
                const data = response.data;
                if (data.success && data.result.records.length > 0) {
                    const record = data.result.records[0];
                    return {
                        license_plate: (_a = record.mispar_rechev) === null || _a === void 0 ? void 0 : _a.toString(),
                        make: record.tozeret_nm,
                        model: record.kinuy_mishari,
                        year: parseInt(record.shnat_yitzur),
                        color: record.tzeva_rechev,
                        emission_group: record.kvutzat_zihum,
                        valid_until: record.tokef_dt ? new Date(record.tokef_dt) : null,
                        trim_level: record.ramat_gimur,
                        last_test: record.mivchan_acharon_dt ? new Date(record.mivchan_acharon_dt) : null,
                        model_type: record.sug_degem,
                        model_number: record.degem_cd
                    };
                }
                return null;
            }
            catch (error) {
                console.error('Error fetching data from data.gov.il:', error);
                throw error;
            }
        });
    }
}
exports.VehicleService = VehicleService;
