import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendApiResponse from '../../../shared/sendApiResponse';
import { AuthService } from './auth.service';
import config from '../../../config';
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
  ISignupUserResponse,
} from './auth.interface';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  const data = await AuthService.createUser(user);
  const { refreshToken, ...others } = data;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendApiResponse<ISignupUserResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is registered successfully!',
    data: others,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const data = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = data;

  //   set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendApiResponse<ILoginUserResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully!',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const data = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendApiResponse<IRefreshTokenResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'New access token generated successfully!',
    data,
  });
});

export const AuthController = { createUser, loginUser, refreshToken };
