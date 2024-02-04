const express = require('express')
require("./db/mongoose.js")
const User = require("./db/models/user.js")
const Task = require("./db/models/task.js")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users',(req,res)=>{
    const user = new User(req.body)
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(500).send()
    })
})

app.get('/users/:id',(req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        console.log(user)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })
})
//
//Goal:Setup the task creation endpoint
//
//1. Create a separate file for the task model(load it into index.js)
//2. Create the task creation endpoint (handle success and error)
//3. Test the endpoint from postman with good and bad data
app.post('/tasks',(req,res)=>{
    const task = new Task(req.body)
    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})
//Goal:Setup the task reading endpoints
//
//1.Create an endpoint for fetching all tasks
//2.Create an endpoint for fetching a task by its id
//3.Setup new requests in Postman and test your works

app.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.status(201).send(tasks)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

app.listen(port,()=>{
    console.log('Server is Up on Port '+ port)
})