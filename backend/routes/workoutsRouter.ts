import express from 'express';

import {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} from '../controllers/workoutController';

const router = express.Router()

// GET all workouts
router.get('/', getWorkouts)

// GET single workouts 
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

router.get('/', () => {})

export default router