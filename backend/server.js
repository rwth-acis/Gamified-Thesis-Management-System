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

app.get('/', (req,res)=>{
    res.json({
        message: "welcome to the app!"
    })
})

app.use('/api/todo',todoRoutes)
app.use('/api/plan',planRoutes)
app.use('/api/user',userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests
        app.listen(process.env.PORT, ()=>{
        console.log("connected to db and listening on port 5000")
        })
    })
    .catch((error)=>{
        console.log("error occured: ", error)
    })