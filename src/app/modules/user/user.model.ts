/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { role } from './user.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import config from '../../../config';
import bcrypt from 'bcrypt';

const UserSchema = new Schema<IUser, UserModel>(
  {
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: role,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.statics.isUserExist = async function (
  email: string
): Promise<Partial<IUser> | null> {
  return await User.findOne({ email }, { _id: 1, password: 1, role: 1 });
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    const isExistPhone = await User.findOne({
      phoneNumber: this.phoneNumber,
    });
    const isExistEmail = await User.findOne({
      email: this.email,
    });
    if (isExistPhone && isExistEmail) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'The user already exists with this phoneNumber and email!'
      );
    }
    if (isExistEmail) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'The user already exists with this email!'
      );
    }
    if (isExistPhone) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'The user already exists with this phoneNumber!'
      );
    }
  }
  next();
});

UserSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
