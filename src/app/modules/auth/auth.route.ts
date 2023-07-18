import { Router } from 'express';
import { AuthController } from '../auth/auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';
const router = Router();

router
  .post('/signup', AuthController.createUser)
  .post(
    '/login',
    auth(ENUM_USER_ROLE.HOUSE_OWNER, ENUM_USER_ROLE.HOUSE_RENTER),
    AuthController.loginUser
  )
  .post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;
