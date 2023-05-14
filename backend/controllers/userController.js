const mongoose = require('mongoose')
const User = require('../models/userModel')
const History = require('../models/historyModel')
const Plan = require('../models/planModel')
const Todo = require('../models/todoModel')

const getAllUser = async (req,res) => {
    try {
        const user = await User.find({}).sort({firstName: 1})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getAllVisibleUser = async (req,res) => {
    try {
        const user = await User.find({visible: true}).sort({firstName: 1})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getUserById = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }
    try {
        const user = await User.findOne({_id:id})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getUserByMail = async (req,res) => {
    const {mail} = req.params
    try {
        const user = await User.findOne({email:mail})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getAllHistOfUser = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }
    try {
        const user = await User.findOne({_id:id}).select('hasHistory')
        const histories = await History.find({_id: { $in: user.hasHistory }}).sort({time:-1})
        res.status(200).json(histories)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getAllPlanOfUser = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }
    try {
        const user = await User.findOne({_id:id}).select('hasPlan')
        const plans = await Plan.find({_id: { $in: user.hasPlan }}).sort({endDate:1})
        res.status(200).json(plans)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getAllTodoOfUser = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }
    try {
        const user = await User.findOne({_id:id}).select('hasToDo')
        const todos = await Todo.find({_id: { $in: user.hasToDo }}).sort({dueDate:1})
        res.status(200).json(todos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getAllTodoTodoOfUser = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }
    try {
        const user = await User.findOne({_id:id}).select('hasToDo')
        const todos = await Todo.find({_id: { $in: user.hasToDo }, status: "To Do"}).sort({dueDate:1})
        res.status(200).json(todos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getAllTodoDoingOfUser = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }
    try {
        const user = await User.findOne({_id:id}).select('hasToDo')
        const todos = await Todo.find({_id: { $in: user.hasToDo },status: "Doing"}).sort({dueDate:1})
        res.status(200).json(todos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getAllTodoFinishedOfUser = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }
    try {
        const user = await User.findOne({_id:id}).select('hasToDo')
        const todos = await Todo.find({_id: { $in: user.hasToDo },status:"Finished"}).sort({dueDate:1})
        res.status(200).json(todos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createUser = async (req,res) => {
    const {firstName, lastName, email, token, role, workType, history, hasPlan, hasToDo} = req.body 

    try {
        const user = await User.create({firstName, lastName, email, token, role, workType, history, hasPlan, hasToDo})
        res.status(200).json(user)
    } catch (error) { 
        res.status(400).json({error: error.message})
    }
}
const updateUser = async (req,res) => {
    const {id} = req.params
    const {firstName, lastName, email, workType, workName, visible} = req.body 
    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }

    try {
        const user = await User.findOneAndUpdate({_id: id}, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            workType: workType,
            workName: workName,
            visible: visible
        })
        res.status(200).json(user)
    } catch (error) { 
        res.status(400).json({error: error.message})
    }
}
const validateAdmin = async(req,res) => {
    const {id} = req.params
    const {password} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    } else if (password != "!ImNowAdmin!2023") {
        return res.status(404).json({error: "wrong password"})
    }
    try {
        const user = await User.findOneAndUpdate({_id: id}, {
            role: "Supervisors"
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const updateRole = async (req,res) => {
    const {id, role} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }
    try {
        const user = await User.findOneAndUpdate({_id: id}, {
            role: role
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const updateWorkName = async (req,res) => {
    const {id} = req.params
    const {workName} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }
    try {
        const user = await User.findOneAndUpdate({_id: id}, {
            workName: workName
        },{ new: true })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const updateToken = async (req,res) => {
    const {id, token} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }
    try {
        const user = await User.findOneAndUpdate({_id: id}, {
            token: token
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const updateWorkType = async (req,res) => {
    const {id, type} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }
    try {
        const user = await User.findOneAndUpdate({_id: id}, {
            workType: type
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const pushPlan = async (req,res) => {
    const {uid, pid} = req.body
    
    if(!mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(404).json({error: "User not found"})
    }
    try {
        const user = await User.findOneAndUpdate({_id: uid}, {
            $addToSet: {hasPlan: pid}
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const pushPlanWitToken = async (req,res) => {
    const {token, pid} = req.body
    
    try {
        const user = await User.findOneAndUpdate({token: token}, {
            $addToSet: {hasPlan: pid}
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const pushTodo = async (req,res) => {
    const {uid, tid} = req.body
    
    if(!mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(404).json({error: "User not found"})
    }
    try {
        const user = await User.findOneAndUpdate({_id: uid}, {
            $addToSet: {hasToDo: tid}
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const pushTodoWithToken = async (req,res) => {
    const {token, tid} = req.body

    try {
        const user = await User.findOneAndUpdate({token: token}, {
            $addToSet: {hasToDo: tid}
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const pushHistory = async (req,res) => {
    const {uid, hid} = req.body
    
    if(!mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(404).json({error: "User not found"})
    }
    try {
        const user = await User.findOneAndUpdate({_id: uid}, {
            $addToSet: {hasHistory: hid}
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const pushHistoryWithToken = async (req,res) => {
    const {token, hid} = req.body

    try {
        const user = await User.findOneAndUpdate({token: token}, {
            $addToSet: {hasHistory: hid}
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const getProgressOfUser = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }
    try {
        const user = await User.findOne({_id:id}).populate('hasPlan')
        
        let numTodo = 0
        let numDoing = 0
        let numFinished = 0

        user.hasPlan.forEach(plan => {
            if(plan) {
                switch (plan.status) {
                    case 'To Do':
                        numTodo++
                        break;   
                    case 'Doing':
                        numDoing++
                        break;
                    case 'Finished':
                        numFinished++
                        break;
                    default:
                        break;
                }
            }
        })
        if (numDoing + numFinished + numTodo !== 0) {
            const progress = (numTodo * 0 + numDoing * 1 + numFinished * 5) / ((numDoing + numTodo + numFinished) * 5)
            res.status(200).json({"progress": progress})
        } else {
            res.status(200).json({"progress": 0})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
/*
const addPlan = async (req,res) => {
    const {id, plan} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }
    try {
        const user = await User.findOneAndUpdate({_id: id}, {
            $push: {hasPlan: plan}
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const addTodo = async (req,res) => {
    const {id, todo} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "User not found"}) 
    }
    try {
        const user = await User.findOneAndUpdate({_id: id}, {
            $push: {hasToDo: todo}
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
*/

module.exports = {
    getAllUser,
    getAllVisibleUser,
    getUserById,
    getUserByMail,
    getAllHistOfUser,
    getAllPlanOfUser,
    getAllTodoOfUser,
    getAllTodoTodoOfUser,
    getAllTodoDoingOfUser,
    getAllTodoFinishedOfUser,
    createUser,
    updateRole,
    updateToken,
    updateWorkType,
    pushHistory,
    pushHistoryWithToken,
    pushPlan,
    pushPlanWitToken,
    pushTodo,
    pushTodoWithToken,
    validateAdmin,
    getProgressOfUser,
    updateWorkName,
    updateUser
}