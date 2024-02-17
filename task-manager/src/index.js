const express = require('express')
require("./db/mongoose.js")
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
const app = express()
const port = process.env.PORT || 3000
//Express Middleware
// app.use((req,res,next)=>{
//     if(req.method == 'GET'){
//         res.send('GET Requests are disabled')
//     }else{
//         next()
//     }
// })

//Goal:Setup middleware for maintenance mode
//
//1.Register a new middleware function
//2.Send back a maintenance message with 503 status code.
//3.Try your requests from server and confirm status/message shows

// app.use((req,res,next)=>{
//     res.status(503).send("Site is currently down.Check back soon!")
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.listen(port, () => {
    console.log('Server is Up on Port ' + port)
})