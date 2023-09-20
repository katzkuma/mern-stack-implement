import Workout, { workoutInterface } from '../models/workoutModel';
import { 
    createWorkoutService,
    getWorkoutsService,
    getWorkoutService,
    updateWorkoutService,
    deleteWorkoutInDB,
} from '../services/workoutService';
import { Request, Response } from 'express'

import mongoose from 'mongoose';

// get all workouts
export const getWorkouts = async (req: Request, res: Response) => {
    // get all the workout data from database
    const result = await getWorkoutsService()
    //return response
    switch (result.type) {
        case "success":
            return res.status(200).json(result.content.payload)
        default:
            return res.status(400).json({error: result.content.message})
            break;
    }
}

// get a single workout
export const getWorkout = async (req: Request, res: Response) => {
    // get the id from request
    const {id} = req.params

    // get all the workout data from database
    const result = await getWorkoutService(id)

    switch (result.type) {
        case "success":
            res.status(200).json(result.content.payload)
            break;
    
        case "error":
            res.status(404).json({error: result.content.message})
            break;
        default:
            break;
    }
}

// create new workout
export const createWorkout = async (req: Request, res: Response) => {
    // create workout data into database
    const result = await createWorkoutService(req)

    //return response
    switch (result.type) {
        case "success":
            return res.status(200).json(result.content.payload)
        case "error":
            if (result.content.title == '') {
                return res.status(400).json({error: result.content.message})
            }
            if (result.content.title == 'validator-empty-fields') {
                return res.status(400).json({ error: result.content.message, content: result.content.payload})
            }
        default:
            break;
    }
}

// delete a workout
export const deleteWorkout = async (req: Request, res: Response) => {
    // get param from URL
    const { id } = req.params

    const result = await deleteWorkoutInDB(id)

    //return response
    switch (result.type) {
        case "success":
            return res.status(200).json(result.content.payload)
        case "error":
            if (result.content.title == '') {
                return res.status(400).json({error: result.content.message})
            }
        default:
            break;
    }
}

// update a workout
export const updateWorkout = async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await updateWorkoutService(id, req)

    //return response
    switch (result.type) {
        case "success":
            return res.status(200).json(result.content.payload)
        case "error":
            if (result.content.title == '') {
                return res.status(400).json({error: result.content.message})
            }
            if (result.content.title == 'validator-empty-fields') {
                return res.status(400).json({ error: result.content.message, content: result.content.payload})
            }
        default:
            break;
    }
}