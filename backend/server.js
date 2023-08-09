require('dotenv').config()

const express = require('express')
const workoutRouter = require('./routes/workouts')
// initial app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method, req.url, req.body)
    next()
})

// routes
app.use('/api/workouts', workoutRouter)

// start listening
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})

module.exports = app