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
const getAHist = async(req,res) => {
    const {id} = req.params
    try {
        const hist = await History.findOne({_id:id}).sort({time: 1})
        res.status(200).json(hist)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createHist = async(req,res) => {
    const {types, time, ofUser, content} = req.body
    if(content === '') {
        return res.status(404).json({error: "history content can not be empty"})
    }
    try {
        const hist = await History.create({types, time, ofUser, content})
        res.status(200).json(hist)
    } catch (error) { 
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllHist,
    createHist,
    getAHist
}