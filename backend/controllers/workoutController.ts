import Workout, { workoutInterface } from '../models/workoutModel';
import { 
    createWorkoutService,
    getWorkoutsService,
    getWorkoutService,
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
    const {_id} = req.params

    // get all the workout data from database
    const result = await getWorkoutService(_id)

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
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout) {
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// update a workout
export const updateWorkout = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout) {
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}