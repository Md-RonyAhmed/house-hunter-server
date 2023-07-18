import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { HouseRoutes } from '../modules/house/house.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/house',
    route: HouseRoutes,
  },
  //   {
  //     path: '/booking',
  // //     route: BookingRoutes,
  //   },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
