import express from 'express';
import { HouseController } from './house.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router
  .post(
    '/create-house',
    auth(ENUM_USER_ROLE.HOUSE_OWNER),
    HouseController.createHouse
  )
  .get('/all-house', HouseController.getAllHouse);

export const HouseRoutes = router;
