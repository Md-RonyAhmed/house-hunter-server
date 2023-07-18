import { Router } from 'express';
import { AuthController } from '../auth/auth.controller';
const router = Router();

router
  .post('/signup', AuthController.createUser)
  .post('/login', AuthController.loginUser)
  .post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;
