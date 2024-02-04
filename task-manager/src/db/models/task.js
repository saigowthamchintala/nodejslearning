const mongoose = require('mongoose')
const validator = require('validator')

//
//Goal:Create a model for tasks
//
//1.Define the model with description and completed fields
//2.Create a new instance of the model
//3.Save the model to the database
//4.Test your work


//Goal:Add validation and sanitization to task
//
//1.Trim the description and make it required
//2.Make completed optional and default is to false
//3.Test your work with and without errors
//

const Task = mongoose.model('Task',{
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})
// const task = new Task({
//     description:'  Eat Lunch'
// })

// task.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

module.exports = Task