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
    pushTodoWithToken,
    getAllTodoTodoOfUser,
    getAllTodoDoingOfUser,
    getAllTodoFinishedOfUser,
    validateAdmin,
    getProgressOfUser,
    updateWorkName,
    getAllVisibleUser,
    updateUser,
    getUserByToken
} = require('../controllers/userController')

router.get("/",getAllUser)
router.get("/visible/",getAllVisibleUser)
router.get("/:id",getUserById)
router.get("/mail/:mail",getUserByMail)
router.get("/token/:token",getUserByToken)
router.get("/history/:id",getAllHistOfUser)
router.get("/plan/:id",getAllPlanOfUser)
router.get("/todo/:id",getAllTodoOfUser)
router.get("/todo/todo/:id",getAllTodoTodoOfUser)
router.get("/todo/doing/:id",getAllTodoDoingOfUser)
router.get("/todo/finished/:id",getAllTodoFinishedOfUser)
router.post("/",createUser)
router.patch("/role/",updateRole)
router.patch("/token/",updateToken)
router.patch("/worktype/",updateWorkType)
router.post("/history/token/",pushHistoryWithToken)
router.post("/plan/token/",pushPlanWitToken)
router.patch("/:id",updateUser)
router.post("/todo/token/",pushTodoWithToken)
router.post("/admin/:id",validateAdmin)
router.get("/progress/:id",getProgressOfUser)
router.post("/plan/",pushPlan) //Not used yet
router.post("/history/",pushHistory) //Not used yet
router.patch("/workname/:id",updateWorkName) //Not used yet
router.post("/todo/",pushTodo) //Not used yet
module.exports = router