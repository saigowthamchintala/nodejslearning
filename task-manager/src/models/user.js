const mongoose = require('mongoose')
const validator = require('validator')
//Goal:Add a password to User
//
//1.Setup the field as a required string
//2.Ensure the length is greater than 6
//3.Trim the password
//4.Ensure the password doesn't contain "password"
//5.Test your work
//

const User = mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            } 
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('Password cannot contain "password"')
            }
        }
        // validate(value){
        //     if((!(value.length > 6)) || value == "password"){
        //         throw new Error('Password Criteria is not met')
        //     }
        // }
    }
})

// const me  = new User({ 
//     name:"   Rose ",
//     email:"Rose@mead.io    ",
//     password:"passwor             "
// })

// me.save().then((result)=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error!',error)
// })

module.exports = User