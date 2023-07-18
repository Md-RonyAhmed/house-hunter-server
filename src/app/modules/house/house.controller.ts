import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendApiResponse from '../../../shared/sendApiResponse';
import httpStatus from 'http-status';
import { IHouse } from './house.interface';
import { HouseService } from './house.service';
import { houseFilterableFields } from './house.constant';
import { paginationFields } from '../../../constants/pagination';
import pick from '../../../shared/pick';

const createHouse = catchAsync(async (req: Request, res: Response) => {
  const { ...house } = req.body;
  const owner = req?.user;
  const data = await HouseService.createHouse(house, owner);

  sendApiResponse<IHouse>(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'House added successfully!',
    data,
  });
});

//get all Houses
const getAllHouse = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, houseFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const data = await HouseService.getAllHouse(filters, paginationOptions);

  sendApiResponse<IHouse[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Houses retrieved successfully!',
    meta: data.meta,
    data: data.data,
  });
});

export const HouseController = { createHouse, getAllHouse };
