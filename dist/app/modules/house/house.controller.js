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
exports.HouseController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendApiResponse_1 = __importDefault(require("../../../shared/sendApiResponse"));
const http_status_1 = __importDefault(require("http-status"));
const house_service_1 = require("./house.service");
const house_constant_1 = require("./house.constant");
const pagination_1 = require("../../../constants/pagination");
const pick_1 = __importDefault(require("../../../shared/pick"));
const createHouse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const house = __rest(req.body, []);
    const ownerId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    const data = yield house_service_1.HouseService.createHouse(house, ownerId);
    (0, sendApiResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'House added successfully!',
        data,
    });
}));
//get all Houses
const getAllHouse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, house_constant_1.houseFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const data = yield house_service_1.HouseService.getAllHouse(filters, paginationOptions);
    (0, sendApiResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Houses retrieved successfully!',
        meta: data.meta,
        data: data.data,
    });
}));
exports.HouseController = { createHouse, getAllHouse };
