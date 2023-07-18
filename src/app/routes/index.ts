import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
// import { UserRoutes } from '../modules/user/user.route';
// import { CowRoutes } from '../modules/cow/cow.route';
// import { OrderRoutes } from '../modules/order/order.route';
// import { AdminRoutes } from '../modules/admin/admin.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
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

export default router;
