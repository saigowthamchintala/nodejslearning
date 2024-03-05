const express = require('express')
require("./db/mongoose.js")
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
const app = express()
// const port = process.env.PORT || 3000
const port = process.env.PORT 


//This piece of code helps in testing of file uploads in NodeJS
// const multer = require('multer')
// const upload = multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         // cb(new Error('File must be a PDF.')),
//         // cb(undefine,true)
//         // cb(undefined,true)
//         // if(!file.originalname.endsWith('.pdf')){
//         //     return cb(new Error("File must be a PDF."))
//         // }
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error("Please upload a word document."))
//         }
//         cb(undefined,true)
//     }
// })
// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{
//     res.status(400).send({
//         error:error.message
//     })
// })

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


//This piece of code is to check/understand the user-task relationship
// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async () =>{
//     // const task = await Task.findById('65d9ce44aa01bfe80eb6da01')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
    
//     const user = await User.findById("65d9ce34aa01bfe80eb6d9fb")  
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)  
// }
// main()