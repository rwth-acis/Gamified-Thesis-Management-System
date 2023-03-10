const mongoose = require('mongoose')
const User = require('../models/userModel')

const getAllUser = async (req,res) => {
    try {
        const user = await User.find({}).sort({firstName: 1})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getUserById = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "no such user"}) 
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
        return res.status(404).json({error: "no such user"}) 
    }
    try {
        const user = await User.find({_id:id})
        res.status(200).json(user.hasHistory)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getAllPlanOfUser = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "no such user"}) 
    }
    try {
        const user = await User.find({_id:id})
        res.status(200).json(user.hasPlan)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getAllTodoOfUser = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "no such user"}) 
    }
    try {
        const user = await User.find({_id:id})
        res.status(200).json(user.hasToDo)
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

const updateRole = async (req,res) => {
    const {id, role} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "no such user"}) 
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
const updateToken = async (req,res) => {
    const {id, token} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "no such user"}) 
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
        return res.status(404).json({error: "no such user"}) 
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
        return res.status(404).json({error: "no such user"})
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
const pushTodo = async (req,res) => {
    const {uid, tid} = req.body
    
    if(!mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(404).json({error: "no such user"})
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
const pushHistory = async (req,res) => {
    const {uid, hid} = req.body
    
    if(!mongoose.Types.ObjectId.isValid(uid)) {
        return res.status(404).json({error: "no such user"})
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

/*
const addPlan = async (req,res) => {
    const {id, plan} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "no such user"}) 
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
        return res.status(404).json({error: "no such user"}) 
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
    getUserById,
    getUserByMail,
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
}