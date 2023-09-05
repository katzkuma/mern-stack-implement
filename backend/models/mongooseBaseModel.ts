import mongoose from 'mongoose';

export interface BaseSchema  {
    _id: String;
    createdAt: Date;
    updatedAt: Date;
}

// export const mongooseBaseSchema = new mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   createdAt: { type: Date, default: Date.now, required: false},
//   updatedAt: { type: Date, default: Date.now, required: false },
// });