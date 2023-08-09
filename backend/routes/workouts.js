const express = require('express')

const router = express.Router()

// GET all workouts
router.get('/', (req, res) => {
    res.json({mssg: 'GET all workouts'})
})

// GET single workouts 
router.get('/:id', (req, res) => {
    res.send({mssg: 'GET a single workout'})
})

router.get('/', () => {})

module.exports = router