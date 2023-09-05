import { Schema, model } from 'mongoose';
import { BaseSchema } from './mongooseBaseModel';

export interface workoutInterface extends BaseSchema {
    title: string;
    load: Number;
    reps: Number;
}

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    }
    
}, { timestamps: true })

export default model('Workout', workoutSchema)
