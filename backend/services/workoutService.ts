import Workout, { workoutInterface } from "../models/workoutModel"
import { ActionContentDTO } from '../dtos/actionContentDTO';
import { Request } from 'express'
import { workoutValidator } from "../validators/workoutValidator";


// create new workout
export const createWorkoutService = async (req: Request): Promise<ActionContentDTO> => {
    // validate if there is an empty field
    const result = workoutValidator(req)
    if(result.type != "success"){
        result.content.message = 'Please fill in all the fields.'
        return result
    }

    // add doc to db
    const {title, load, reps}: workoutInterface = req.body
    try {
        const workout = await Workout.create({title, load, reps})
        return {type: "success", content: {title:"", message: 'Create Workout data successful', payload: workout}}
    } catch (error: any) {
        return {type: "error", content: {title:"", message: 'Create Workout data fail', payload: error.message}}
    }
}