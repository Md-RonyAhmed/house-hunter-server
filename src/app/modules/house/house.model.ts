import { Schema, model } from 'mongoose';
import { HouseModel, IHouse } from './house.interface';
import { houseCities } from './house.constant';

const HouseSchema = new Schema<IHouse, HouseModel>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, enum: houseCities, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    roomSize: { type: Number, required: true },
    picture: { type: String },
    availabilityDate: { type: Date, required: true },
    rentPerMonth: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    description: { type: String },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const House = model<IHouse, HouseModel>('House', HouseSchema);
