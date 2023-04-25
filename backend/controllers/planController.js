const Plan = require('../models/planModel')
const ToDo = require('../models/todoModel') 
const User = require('../models/userModel')
const mongoose = require('mongoose')

const getAllPlan = async (req,res) => {
    try {
        const plan = await Plan.find({}).sort({startDate: -1})
        res.status(200).json(plan)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getAPlan = async (req,res) => {
    const {id} = req.params
    try {
        const plan = await Plan.findOne({_id:id})
        res.status(200).json(plan)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const createPlan = async (req,res) => {
    const {title, content, status, startDate, endDate, ofUser} = req.body // how to add ofUser here?

    try { // how to handle of user?
        const plan = await Plan.create({title, content, status, startDate, endDate, ofUser})
        res.status(200).json(plan)
    } catch (error) { 
        res.status(400).json({error: error.message})
    }
}
const changestatusDoing = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "no such plan"}) 
    }
    try {
        const plan = await Plan.findOneAndUpdate({_id: id}, {
            status: "Doing"
        })
        res.status(200).json(plan)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const changestatusFinished = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "no such plan"}) 
    }
    try {
        const plan = await Plan.findOneAndUpdate({_id: id}, {
            status: "Finished"
        })
        res.status(200).json(plan)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
const deletePlan = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "no such plan"}) 
    }
    try {
        const todos = await ToDo.find({ ofPlan: id });
        await ToDo.deleteMany({ofPlan: {$in: [id]}})
        const users = await User.find({ hasPlan: id });

        await Promise.all(
          users.map(async (user) => {
            user.hasPlan.pull(id);
            todos.forEach((todo) => {
              user.hasToDo.pull(todo.id);
            });
    
            await user.save();
          })
        )
        /*
        const users = await User.findOneAndUpdate({hasPlan: {$in: [id]}},{
            $pull: {
                hasPlan: id,
                hasToDo: {$in: todos.map((todo) => todo._id)}
            }
        })*/
        //const users2 = await User.findOneAndUpdate({_id:users._id},{
        //    $pull: {hasToDo: {$in: todos.map((todo) => todo._id)}}
        //})
        
        //todos.forEach(async (Todo) => {
        //    await Todo.updateOne({ _id: Todo._id }, { $pull: {ofPlan : id } });
        //})
        const plan = await Plan.findByIdAndDelete({_id: id})
        res.status(200).json({user:users,todo:todos,plan:plan})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
// pushTodo function pushes a todo id into the plan's 'todos' attribute, indicating that the todo belongs to the plan
const pushTodo = async (req,res) => {
    const {pid, tid} = req.body
    
    if(!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(404).json({error: "no such plan"})
    }
    try {
        const plan = await Plan.findOneAndUpdate({_id: pid}, {
            $addToSet: {todos: tid}
        })
        res.status(200).json(plan)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const pushUser = async (req,res) => {
    const {pid, uid} = req.body
    
    if(!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(404).json({error: "no such plan"})
    }
    try {
        const plan = await Plan.findOneAndUpdate({_id: pid}, {
            $addToSet: {ofUser: uid}
        })
        res.status(200).json(plan)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getProgress = async(req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: "no such plan"}) 
    }
    try {
        const plan = await Plan.findById(id).populate("todos")
         
        // const todoNum = todoArr.length
        let numTodo = 0
        let numDoing = 0
        let numFinished = 0

        plan.todos.forEach(todo => {
            //const todo = Todo.findOne({_id:todoId});
            if(todo) {
                switch (todo.status) {
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
const updatePlan = async(req,res) => {
    const {id} = req.params
    const {title, start, dueDate} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such Plan"})
    }
    try {
        const plan = await Plan.findOneAndUpdate({_id: id}, {
            title: title,
            startDate: start,
            endDate: dueDate
        })
        res.status(200).json(plan)
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}

module.exports = {
    getAllPlan,
    getAPlan,
    createPlan,
    changestatusDoing,
    changestatusFinished,
    deletePlan,
    pushTodo,
    pushUser,
    getProgress,
    updatePlan
}