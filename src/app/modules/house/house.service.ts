import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IHouse, IHouseFilters } from './house.interface';
import { House } from './house.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { houseSearchableFields } from './house.constant';
import { SortOrder } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import { validatePhoneNumber } from '../user/user.utils';

export const createHouse = async (
  house: IHouse,
  owner: JwtPayload | null
): Promise<IHouse | null> => {
  const createdHouse = await House.create({
    ...house,
    ownerId: owner?._id,
  });

  const { phoneNumber } = house;
  if (!validatePhoneNumber(phoneNumber)) {
    throw new Error(
      'Invalid phone number. Only Bangladeshi phone numbers with 11 digits are allowed.'
    );
  }

  if (!createdHouse) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create House!');
  }

  return createdHouse;
};

//get all House from db
const getAllHouse = async (
  filters: IHouseFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IHouse[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: houseSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field === 'rentPerMonthMin' || field === 'rentPerMonthMax') {
          return {
            rentPerMonth: {
              [`$${field.includes('Min') ? 'gte' : 'lte'}`]: value,
            },
          };
        }
        return {
          [field]: value,
        };
      }),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const data = await House.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const count = await House.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data,
  };
};

export const HouseService = {
  createHouse,
  getAllHouse,
};
