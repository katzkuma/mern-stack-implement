require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRouter = require('./routes/workoutsRouter')
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

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // start listening
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error);
    })

module.exports = app