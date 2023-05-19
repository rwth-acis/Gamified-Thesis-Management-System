const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Students', 'Supervisors'],
        default: 'Students'
    },
    /* Maybe for future work?
    hasStudents: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    hasSupervisors: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    */
    token: {
        type: String,
        default: ''
    },
    workName: {
        type: String,
        default: ''
    },
    workType: {
        type: String,
        required: true
    },
    visible: {
        type: Boolean,
        default: true
    },
    hasHistory: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'History'
    }],
    hasPlan: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Plan'
    }],
    hasToDo: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'ToDo'
    }]
},{timestamps: false})

module.exports = mongoose.model('User', userSchema)
