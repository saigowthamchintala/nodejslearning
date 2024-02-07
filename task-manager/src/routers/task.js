const express = require('express')
const router = new express.Router()
const Task = require("../models/task.js")
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

//Refactoring POST /tasks end point
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

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
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
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
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates =['description','completed']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try {
       const task =  await Task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
       if(!task){
            return res.status(404).send()
       }
       res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',async (req,res)=>{
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

})
module.exports = router