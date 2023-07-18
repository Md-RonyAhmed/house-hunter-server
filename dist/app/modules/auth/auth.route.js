"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../auth/auth.controller");
const router = (0, express_1.Router)();
router
    .post('/signup', auth_controller_1.AuthController.createUser)
    .post('/login', auth_controller_1.AuthController.loginUser)
    .post('/refresh-token', auth_controller_1.AuthController.refreshToken);
exports.AuthRoutes = router;
