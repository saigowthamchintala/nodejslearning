const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//Goal:Add a password to User
//
//1.Setup the field as a required string
//2.Ensure the length is greater than 6
//3.Trim the password
//4.Ensure the password doesn't contain "password"
//5.Test your work
//

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

// userSchema.methods.getPublicProfile = function(){
//     const user = this //Not really necessary
//     const userObject = user.toObject()
//     delete userObject.password
//     delete userObject.tokens
//     return userObject
// }
//OR
userSchema.methods.toJSON = function(){
    const user = this //Not really necessary
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this //Not really necessary
    const token = jwt.sign({_id:user._id.toString()},'thisisjsonwebtoken')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to Login!')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to Login!')
    }
    return user
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User',userSchema)

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