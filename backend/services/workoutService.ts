import Workout, { workoutInterface } from "../models/workoutModel"
import { ActionContentDTO } from '../dtos/actionContentDTO';
import { Request } from 'express'
import { 
    createWorkoutValidator,
    isIdValidValidator
 } from "../validators/workoutValidator";

// get all workouts
export const getWorkoutsService = async (): Promise<ActionContentDTO> => {
    try {
        const workouts = await Workout.find({}).sort({createAt: -1})
        return { type: "success", content: { title: "", message: "Get workout data successful", payload: workouts}}    
    } catch (error) {
        return { type: "error", content: { title: "", message: "Get workout data fail", payload: null}}    
    }
}

// get a single workout
export const getWorkoutService = async (_id: string): Promise<ActionContentDTO> => {
    // validate the workout data from request
    if (!isIdValidValidator(_id)) {
        return { type: 'error', content: { title: '', message: 'No such workout data', payload: null}}
    }

    // get data from db
    const workout = await Workout.findById(_id)

    if(!workout) {
        return { type: 'error', content: { title: '', message: 'No such workout data', payload: null}}
    }

    return { type: 'success', content: { title: '', message: 'Get workout data successfull', payload: workout}}
}

// create new workout
export const createWorkoutService = async (req: Request): Promise<ActionContentDTO> => {
    // validate if there is an empty field
    const result = createWorkoutValidator(req)
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