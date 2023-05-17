require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

// const port = process.env.PORT || 5000;

const todoRoutes = require('./routes/todoRoutes')
const planRoutes = require('./routes/planRoutes')
const userRoutes = require('./routes/userRoutes')
const histRoutes = require('./routes/histRoutes')

app.get('thesis_system/', (req,res)=>{
    res.json({
        message: "welcome to the app!"
    })
})
/*
app.use('thesis-system/api/todo',todoRoutes)
app.use('thesis-system/api/plan',planRoutes)
app.use('thesis-system/api/user',userRoutes)
app.use('thesis-system/api/hist',histRoutes)
*/
app.use('/api/todo',todoRoutes)
app.use('/api/plan',planRoutes)
app.use('/api/user',userRoutes)
app.use('/api/hist',histRoutes)

mongoose.connect(process.env.REACT_APP_MONGO_URI_TEST)
    .then(()=>{
        //listen for requests, 'https://milki-psy.dbis.rwth-aachen.de/thesis-system'
        app.listen(process.env.REACT_APP_BACKEND_PORT , ()=>{
        console.log("connected to db and listening on port 5000")
        })
    })
    .catch((error)=>{
        console.log("error: ", error)
    })