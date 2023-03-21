const express = require('express')
const router = express.Router()

const History = require('../models/historyModel')
const { getAllHist, createHist } = require('../controllers/histController')

router.get('/',getAllHist)
router.post('/',createHist)

module.exports = router