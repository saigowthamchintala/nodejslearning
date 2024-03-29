const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true
})

// const User = mongoose.model('User',{
//     name:{
//         type: String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         minlength:7,
//         trim:true,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                throw new Error("Password cannot contain'password'.") 
//             }
//         }
//     },
//     age:{
//         type: Number,
//         default:0,
//         validate(value){
//             if(value<0){
//                 throw new Error('Age must be a positive number.')
//             }
//         }
//     }
// })

// const me = new User({
//     name:'   Mike3  ',
//     //  age:-27,
//     email:'Mike3@GMAIL.com    ',
//     password:' password'
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error!',error)
// })


// const Task = mongoose.model('Task',{
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })   

// const task = new Task({
//     description:'Learn the Mongoose Library',
//     completed:"false"
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log('Error!',error)
// })