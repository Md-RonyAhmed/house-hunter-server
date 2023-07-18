"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
// import { UserRoutes } from '../modules/user/user.route';
// import { CowRoutes } from '../modules/cow/cow.route';
// import { OrderRoutes } from '../modules/order/order.route';
// import { AdminRoutes } from '../modules/admin/admin.route';
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    //   {
    //     path: '/users',
    // //     route: UserRoutes,
    //   },
    //   {
    //     path: '/house',
    // //     route: HouseRoutes,
    //   },
    //   {
    //     path: '/booking',
    // //     route: BookingRoutes,
    //   },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
