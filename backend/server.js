require('dotenv').config()

const express = require('express')

// initial app
const app = express()

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome'})
})

// start listening
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})