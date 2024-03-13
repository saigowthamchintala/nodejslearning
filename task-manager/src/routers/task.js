const express = require('express')
const router = new express.Router()
const Task = require("../models/task.js")
const auth = require("../middleware/auth.js")
//
//Goal:Setup the task creation endpoint
//
//1. Create a separate file for the task model(load it into index.js)
//2. Create the task creation endpoint (handle success and error)
//3. Test the endpoint from postman with good and bad data
// router.post('/tasks', (req, res) => {
//     const task = new Task(req.body)
//     task.save().then(() => {
//         res.status(201).send(task)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
//Refactoring POST /tasks end point
// router.post('/tasks', async (req, res) => {
//     const task = new Task(req.body)
//     try {
//         await task.save()
//         res.status(201).send(task)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

//Goal:Setup the task reading endpoints
//
//1.Create an endpoint for fetching all tasks
//2.Create an endpoint for fetching a task by its id
//3.Setup new requests in Postman and test your works

// router.get('/tasks', (req, res) => {
//     Task.find({}).then((tasks) => {
//         res.status(201).send(tasks)
//     }).catch((e) => {
//         res.status(500).send(e)
//     })
// })

//Refactoring GET /tasks end point
// GET /tasks?completed=true
// GET /tasks?limit=2&skip=2
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    try {
        // const tasks = await Task.find({})
        // const tasks = await Task.find({ owner: req.user._id })
        // res.send(tasks)
        //OR
        //await req.user.populate('tasks').execPopulate()
        const match ={}
        const sort = {}
        if(req.query.completed){
            match.completed = req.query.completed === 'true'
        }
        if(req.query.sortBy){
            parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'desc'? -1 : 1
        }
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)        
    } catch (e) {
        res.status(500).send(e)
    }
})

// router.get('/tasks/:id', (req, res) => {
//     const _id = req.params.id
//     Task.findById(_id).then((task) => {
//         console.log(task)
//         if (!task) {
//             return res.status(404).send()
//         }
//         res.send(task)
//     }).catch((e) => {
//         res.status(500).send(e)
//     })
// })

//Refactoring GET /tasks/:id end point
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({_id,owner:req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        //const task =  await Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
        //const task = await Task.findById(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth ,async (req, res) => {
    const _id = req.params.id
    try {
        //const task = await Task.findByIdAndDelete(_id)
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id}) 
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

})
module.exports = router