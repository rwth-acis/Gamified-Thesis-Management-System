const express = require('express')
const router = express.Router()

const User = require('../models/userModel')
const {
    getAllUser,
    getAllHistOfUser,
    getAllPlanOfUser,
    getAllTodoOfUser,
    createUser,
    updateRole,
    updateToken,
    updateWorkType,
    pushHistory,
    pushPlan,
    pushTodo
} = require('../controllers/userController')

router.get("/",getAllUser)
router.get("/history/",getAllHistOfUser)
router.get("/plan/",getAllPlanOfUser)
router.get("/todo/",getAllTodoOfUser)
router.post("/",createUser)
router.patch("/role/",updateRole)
router.patch("/token/",updateToken)
router.patch("/worktype/",updateWorkType)
router.post("/history/",pushHistory)
router.post("/plan/",pushPlan)
router.post("/todo/",pushTodo)

module.exports = router