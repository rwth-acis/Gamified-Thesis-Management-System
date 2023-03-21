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
    pushTodo,
    getUserById,
    getUserByMail,
    pushHistoryWithToken,
    pushPlanWitToken,
    pushTodoWithToken
} = require('../controllers/userController')

router.get("/",getAllUser)
router.get("/:id",getUserById)
router.get("/mail/:mail",getUserByMail)
router.get("/history/:id",getAllHistOfUser)
router.get("/plan/:id",getAllPlanOfUser)
router.get("/todo/:id",getAllTodoOfUser)
router.post("/",createUser)
router.patch("/role/",updateRole)
router.patch("/token/",updateToken)
router.patch("/worktype/",updateWorkType)
router.post("/history/",pushHistory)
router.post("/history/token/",pushHistoryWithToken)
router.post("/plan/",pushPlan)
router.post("/plan/token/",pushPlanWitToken)
router.post("/todo/",pushTodo)
router.post("/todo/token/",pushTodoWithToken)

module.exports = router