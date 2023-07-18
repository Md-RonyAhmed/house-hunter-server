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
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: true,
        select: 0,
    },
    role: {
        type: String,
        enum: user_constant_1.role,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
UserSchema.statics.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email }, { _id: 1, password: 1, role: 1 });
    });
};
UserSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew) {
            const isExistPhone = yield exports.User.findOne({
                phoneNumber: this.phoneNumber,
            });
            const isExistEmail = yield exports.User.findOne({
                email: this.email,
            });
            if (isExistPhone && isExistEmail) {
                throw new ApiError_1.default(http_status_1.default.CONFLICT, 'The user already exists with this phoneNumber and email!');
            }
            if (isExistEmail) {
                throw new ApiError_1.default(http_status_1.default.CONFLICT, 'The user already exists with this email!');
            }
            if (isExistPhone) {
                throw new ApiError_1.default(http_status_1.default.CONFLICT, 'The user already exists with this phoneNumber!');
            }
        }
        next();
    });
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hashing user password
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
