"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const house_route_1 = require("../modules/house/house.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/house',
        route: house_route_1.HouseRoutes,
    },
    //   {
    //     path: '/booking',
    // //     route: BookingRoutes,
    //   },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
