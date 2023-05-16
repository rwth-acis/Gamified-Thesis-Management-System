const mongoose = require('mongoose')
const Schema = mongoose.Schema

const planSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['To Do', 'Doing', 'Finished'],
        default: "To Do"
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        requried: true
    },
    seed: {
        type: Number,
        default: Math.floor(Math.random()*100)
    },
    plant: {
        type: String,
        enum: ["Bushy","Dragon","Pilea","Zamia"],
        default: ["Bushy","Dragon","Pilea","Zamia"][Math.floor(Math.random() * 4)]
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'ToDo'
    }],
    ofUser: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
},{timestamps: false})

module.exports = mongoose.model('Plan', planSchema)