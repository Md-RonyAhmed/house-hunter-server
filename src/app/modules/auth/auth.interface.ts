import { IUser } from '../user/user.interface';

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type ISignupUserResponse = {
  createdUser: IUser;
  accessToken: string;
  refreshToken?: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};
