const express = require('express')
const router = express.Router()

const ToDo = require('../models/todoModel')
const {
  createToDo,
  deleteTodo,
  getAllToDo,
  getAllDoing,
  getAllFinished,
  getAllUnfinished,
  changestatusFinished,
  changestatusDoing,
  changestatusTODO,
  pushPlan
} = require('../controllers/todoController')

router.post("/",createToDo)
router.get("/",getAllToDo)
router.delete("/:id",deleteTodo)
router.get("/finished",getAllFinished)
router.get("/doing",getAllDoing)
router.get("/unfinished",getAllUnfinished)
router.patch("/finish/:id",changestatusFinished)
router.patch("/doing/:id",changestatusDoing)
router.patch("/todo/:id",changestatusTODO)
router.post("/pushplan/",pushPlan)

module.exports = router