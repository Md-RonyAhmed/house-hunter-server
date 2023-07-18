/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { Model } from 'mongoose';

export type IUserRole = 'house owner' | 'house renter';
export interface IUser {
  _id?: string;
  email: string;
  phoneNumber: string;
  role: IUserRole;
  password: string;
  fullName: string;
}

export type UserModel = {
  isUserExist(email: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
