const ToDo = require('../models/todoModel') 
const User = require('../models/userModel')
const Plan = require('../models/planModel')
const mongoose = require('mongoose')

const createToDo = async (req,res) => {
    const {title, content, status, dueDate, ofPlan, ofUser} = req.body //set the req.body that's to be sent and remember to send it in raw JSON format

    try {
        const todo = await ToDo.create({title, content, status, dueDate, ofPlan, ofUser})
        res.status(200).json(todo)// notice todo object does not require to be in brackets  
    } catch (error) { //very important to add (error), otherwise is error undefined and could not be used in Homejs
        res.status(400).json({error: error.message})
    }
}
const getAllToDo = async (req,res) => {
    try {
        const todo = await ToDo.find({}).sort({status: -1})
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getAllFinished = async (req,res) => {
    try {
        const todo = await ToDo.find({status: "Finished"}).sort({dueDate: -1})
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const getAllUnfinished = async (req,res) => {
    try {
        const todo = await ToDo.find({status: "To Do"}).sort({dueDate: -1})
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const getAllDoing = async (req,res) => {
    try {
        const todo = await ToDo.find({status: "Doing"}).sort({dueDate: -1})
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const getTodoById = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { // check if the input id is valid
        return res.status(404).json({error: "no such todo"}) //remember to use return in if to end 
    }
    try {
        const todo = await ToDo.findOne({_id: id})
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const changestatusFinished = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { // check if the input id is valid
        return res.status(404).json({error: "no such todo"}) //remember to use return in if to end 
    }
    try {
        const todo = await ToDo.findOneAndUpdate({_id: id}, {
            status: "Finished"
        })
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const changestatusDoing = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { // check if the input id is valid
        return res.status(404).json({error: "no such todo"}) //remember to use return in if to end 
    }
    try {
        const todo = await ToDo.findOneAndUpdate({_id: id}, {
            status: "Doing"
        })
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const changestatusTODO = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { // check if the input id is valid
        return res.status(404).json({error: "no such todo"}) //remember to use return in if to end 
    }
    try {
        const todo = await ToDo.findOneAndUpdate({_id: id}, {
            status: "To Do"
        })
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const deleteTodo = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "no such todo"}) 
    }
    try {
        const users = await User.findOneAndUpdate({hasToDo: {$in: [id]}},{
            $pull: {hasToDo: id}
        })
        
        //users.forEach(async (user) => {
        //    await User.updateOne({ _id: user._id }, { $pull: { hasTodo: id } });
        //})
        const plans = await Plan.find({todos: {$in: [id]}})
        plans.forEach(async (plan) => {
            await Plan.updateOne({ _id: plan._id }, { $pull: { todos: id } });
        })
        const todo = await ToDo.findByIdAndDelete({_id: id})
        res.status(200).json({user:users,plan:plans,todo:todo})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const pushPlan = async (req,res) => {
    const {tid, pid} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(tid)) {
        return res.status(404).json({error: "no such todo"})
    }
    try {
        const todo = await ToDo.findOneAndUpdate({_id: tid}, {
            $addToSet: {ofPlan: pid}
        })
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const updateTodo = async(req,res) => {
    const {id} = req.params
    const {title, content, dueDate} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such todo"})
    }
    try {
        const todo = await ToDo.findOneAndUpdate({_id: id}, {
            title: title,
            content: content,
            dueDate: dueDate
        })
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}

module.exports = {
  createToDo,
  deleteTodo,
  getAllToDo,
  getAllDoing,
  getAllFinished,
  getAllUnfinished,
  getTodoById,
  changestatusFinished,
  changestatusDoing,
  changestatusTODO,
  pushPlan,
  updateTodo
}