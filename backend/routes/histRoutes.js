const express = require('express')
const router = express.Router()

const History = require('../models/historyModel')
const { getAllHist, createHist, getAHist } = require('../controllers/histController')

router.get('/',getAllHist)
router.post('/',createHist)
router.get('/:id',getAHist)

module.exports = router