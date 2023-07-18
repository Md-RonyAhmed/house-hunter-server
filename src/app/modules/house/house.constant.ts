import { IHouseCity } from './house.interface';

export const houseCities: IHouseCity[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

export const houseSearchableFields = [
  'city',
  'bedrooms',
  'bathrooms',
  'roomSize',
  'availabilityDate',
  'rentPerMonth',
];

export const houseFilterableFields = [
  'searchTerm',
  'city',
  'bedrooms',
  'bathrooms',
  'roomSize',
  'availabilityDate',
  'rentPerMonth',
];
