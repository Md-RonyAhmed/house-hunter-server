"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const house_controller_1 = require("./house.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router
    .post('/create-house', (0, auth_1.default)(users_1.ENUM_USER_ROLE.HOUSE_OWNER), house_controller_1.HouseController.createHouse)
    .get('/all-house', house_controller_1.HouseController.getAllHouse);
exports.HouseRoutes = router;
