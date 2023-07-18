/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model } from 'mongoose';

export type IHouseCity =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';

export interface IHouse {
  _id?: string;
  name: string;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  roomSize: number;
  picture?: string;
  availabilityDate: Date;
  rentPerMonth: number;
  phoneNumber: string;
  description?: string;
}

export type IHouseFilters = {
  searchTerm?: string;
  city?: string;
  bedrooms?: number;
  bathrooms?: number;
  roomSize?: number;
  availabilityDate?: Date;
  rentPerMonthMin?: number;
  rentPerMonthMax?: number;
};

export type HouseModel = Model<IHouse, Record<string, unknown>>;
