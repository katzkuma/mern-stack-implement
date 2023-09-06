// import mongoose from 'mongoose';

export interface BaseSchema {
    _id: string;
    //   _id: mongoose.Schema.Types.ObjectId,
    createdAt: Date;
    updatedAt: Date;
}