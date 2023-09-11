import Workout, { workoutInterface } from '../models/workoutModel';
import { createWorkoutService } from '../services/workoutService';
import { Request, Response } from 'express'

import mongoose from 'mongoose';

// get all workouts
export const getWorkouts = async (req: Request, res: Response) => {
    const workouts = await Workout.find({}).sort({createAt: -1})
    Workout.find({
        load: 123,
    })

    res.status(200).json(workouts)
}

// get a single workout
export const getWorkout = async (req: Request, res: Response) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// create new workout
export const createWorkout = async (req: Request, res: Response) => {
    // create workout into database
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