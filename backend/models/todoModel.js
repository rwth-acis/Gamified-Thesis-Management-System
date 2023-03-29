const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
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
    date: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: false
    },
    ofPlan: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Plan'
    }],
    ofUser: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
},{timestamps: false})

module.exports = mongoose.model('ToDo', todoSchema)