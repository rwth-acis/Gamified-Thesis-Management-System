const mongoose = require('mongoose')
const Schema = mongoose.Schema

const historySchema = new Schema ({
    types: {
        type: String,
        enum: ['Create', 'Delete', 'Update'],
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    ofUser: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    content: {
        type: String,
        required: true
    }
},{timestamps: false})

module.exports = mongoose.model('History',historySchema)