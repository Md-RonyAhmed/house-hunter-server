import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
  ILoginUser,
  IRefreshTokenResponse,
  ISignupUserResponse,
} from './auth.interface';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';

//create a new user
const createUser = async (user: IUser): Promise<ISignupUserResponse> => {
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to registered user!');
  }

  //create access token & refresh token
  const { _id, role } = createdUser;
  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    ...createdUser.toObject(),
    accessToken,
    refreshToken,
  };
};

const loginUser = async (
  payload: ILoginUser,
  user: JwtPayload | null
): Promise<Partial<IUser> | null> => {
  const { email, password } = payload;
  const userId = user?._id;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  if (isUserExist?._id?.toString() !== userId?.toString()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  }

  const data = await User.findOne({ email }, { _id: 0, fullName: 1, email: 1 });

  return data;
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { _id: userId } = verifiedToken;

  // if delete User but refresh token is still remaining
  // checking deleted User's refresh token

  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
};
