const mongoose = require('mongoose')
const History = require('../models/historyModel')

const getAllHist = async(req,res) => {
    try {
        const hist = await History.find({}).sort({time: 1})
        res.status(200).json(hist)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllHist
}