import Workout, { workoutInterface } from "../models/workoutModel"
import { ActionContentDTO } from '../dtos/actionContentDTO';
import { Request } from 'express'
import { 
    hasEmptyFieldInWorkoutFormValidator,
    isIdValidValidator
 } from "../validators/workoutValidator";

// get all workouts
export const getWorkoutsFromDB = async (): Promise<ActionContentDTO> => {
    try {
        const workouts = await Workout.find({}).sort({createAt: -1})
        return { type: "success", content: { title: "", message: "Get workout data successful", payload: workouts}}    
    } catch (error) {
        return { type: "error", content: { title: "", message: "Get workout data fail", payload: null}}    
    }
}

// get a single workout
export const getWorkoutByIdFromDB = async (_id: string): Promise<ActionContentDTO> => {
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
export const createWorkoutInDB = async (req: Request): Promise<ActionContentDTO> => {
    // validate if there is an empty field
    const result = hasEmptyFieldInWorkoutFormValidator(req)
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

export const updateWorkoutInDB = async (_id: string, req: Request): Promise<ActionContentDTO> => {
    // validate the workout data from request
    if (!isIdValidValidator(_id)) {
        return { type: 'error', content: { title: '', message: 'No such workout data', payload: null}}
    }

    // validate if there is an empty field
    const result = hasEmptyFieldInWorkoutFormValidator(req)
    if(result.type != "success"){
        result.content.message = 'Please fill in all the fields.'
        return result
    }

    try {
        const {title, load, reps}: workoutInterface = req.body
        // update doc to db then return new doc
        const workout = await Workout.findOneAndUpdate({_id: _id}, {title, load, reps}, { new: true })
        
        if(!workout) {
            return { type: 'error', content: { title: '', message: 'update Workout data fail', payload: null}}
        }
        return { type: 'success', content: { title: '', message: 'update workout data successfull', payload: workout}}
    } catch (error: any) {
        // update fail
        return {type: "error", content: {title:"", message: 'update Workout data fail', payload: error.message}}
    }
}

export const deleteWorkoutInDB = async (_id: string): Promise<ActionContentDTO> => {
    // validate the workout data from request
    if (!isIdValidValidator(_id)) {
        return { type: 'error', content: { title: '', message: 'No such workout data', payload: null}}
    }

    try {
        // delete doc in db then return new doc
        const workout = await Workout.findOneAndDelete({_id: _id})

        if(!workout) {
            return { type: 'error', content: { title: '', message: 'delete Workout data fail', payload: null}}
        }
        return { type: 'success', content: { title: '', message: 'delete workout data successfull', payload: workout}}
    } catch (error: any) {
        // update fail
        return {type: "error", content: {title:"", message: 'delete Workout data fail', payload: error.message}}
    }
}