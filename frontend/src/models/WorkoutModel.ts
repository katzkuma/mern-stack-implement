import { BaseSchema } from './mongooseBaseModel';

export default interface Workout extends BaseSchema {
    title: string,
    load: number,
    reps: number
}

export const createEmptyWorkout = (): Workout => {
    return {
        _id: "",
        title: "",
        load: 0,
        reps: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    };
}