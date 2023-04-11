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
    pushUser,
    getProgress,
    getAPlan,
    updatePlan
} = require('../controllers/planController')

router.post("/",createPlan)
router.get("/",getAllPlan)
router.get("/:id",getAPlan)
router.delete("/:id",deletePlan)
router.get("/progress/:id",getProgress)
router.patch("/doing/:id",changestatusDoing)
router.patch("/finish/:id",changestatusFinished)
router.post("/pushtodo/",pushTodo)
router.post("/pushuser/",pushUser)
router.patch("/:id",updatePlan)


module.exports = router