import * as dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';

import workoutRouter from './routes/workoutsRouter';

// initial .env file
dotenv.config()

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

export default app