"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../auth/auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users_1 = require("../../../enums/users");
const router = (0, express_1.Router)();
router
    .post('/signup', auth_controller_1.AuthController.createUser)
    .post('/login', (0, auth_1.default)(users_1.ENUM_USER_ROLE.HOUSE_OWNER, users_1.ENUM_USER_ROLE.HOUSE_RENTER), auth_controller_1.AuthController.loginUser)
    .post('/refresh-token', auth_controller_1.AuthController.refreshToken);
exports.AuthRoutes = router;
