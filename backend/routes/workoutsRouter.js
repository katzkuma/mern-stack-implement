const express = require('express')

const { 
    getWorkouts,
    getWorkout,
    createWorkout
 } = require('../controllers/workoutController')

const router = express.Router()

// GET all workouts
router.get('/', getWorkouts)

// GET single workouts 
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

router.get('/', () => {})

module.exports = router