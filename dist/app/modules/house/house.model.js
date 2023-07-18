"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.House = void 0;
const mongoose_1 = require("mongoose");
const house_constant_1 = require("./house.constant");
const HouseSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, enum: house_constant_1.houseCities, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    roomSize: { type: Number, required: true },
    picture: { type: String },
    availabilityDate: { type: Date, required: true },
    rentPerMonth: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    description: { type: String },
    ownerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.House = (0, mongoose_1.model)('House', HouseSchema);
