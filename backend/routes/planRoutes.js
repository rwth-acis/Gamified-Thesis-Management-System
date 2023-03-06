const express = require('express')
const router = express.Router()

const Plan = require('../models/planModel')

const {
    getAllPlan,
    createPlan,
    changestatusDoing,
    changestatusFinished,
    deletePlan,
    pushTodo,
    pushUser
} = require('../controllers/planController')

router.post("/",createPlan)
router.get("/",getAllPlan)
router.delete("/:id",deletePlan)
router.patch("/doing/:id",changestatusDoing)
router.patch("/finish/:id",changestatusFinished)
router.post("/pushtodo/",pushTodo)
router.post("/pushuser/",pushUser)


module.exports = router