const express = require('express')
const Workout = require('../models/workoutModel')

const router = express.Router()

// GET all workouts
router.get('/', (req, res) => {
    res.json({mssg: 'GET all workouts'})
})

// GET single workouts 
router.get('/:id', (req, res) => {
    res.send({mssg: 'GET a single workout'})
})

// POST a new workout
router.post('/', async (req, res) => {
    const {title, load, reps} = req.body

    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/', () => {})

module.exports = router