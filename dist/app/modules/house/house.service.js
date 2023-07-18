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
exports.HouseService = exports.createHouse = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const house_model_1 = require("./house.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const house_constant_1 = require("./house.constant");
const createHouse = (house, owner) => __awaiter(void 0, void 0, void 0, function* () {
    const createdHouse = yield house_model_1.House.create(Object.assign(Object.assign({}, house), { ownerId: owner === null || owner === void 0 ? void 0 : owner._id }));
    if (!createdHouse) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create House!');
    }
    return createdHouse;
});
exports.createHouse = createHouse;
//get all House from db
const getAllHouse = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: house_constant_1.houseSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                if (field === 'rentPerMonthMin' || field === 'rentPerMonthMax') {
                    return {
                        rentPerMonth: {
                            [`$${field.includes('Min') ? 'gte' : 'lte'}`]: value,
                        },
                    };
                }
                return {
                    [field]: value,
                };
            }),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const data = yield house_model_1.House.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const count = yield house_model_1.House.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            count,
        },
        data,
    };
});
exports.HouseService = {
    createHouse: exports.createHouse,
    getAllHouse,
};
