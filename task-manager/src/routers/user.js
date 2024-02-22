const express = require('express')
const router = new express.Router()
const User = require("../models/user")
const auth = require('../middleware/auth')

//https://www.webfx.com/web-development/glossary/http-status-codes/-->Reference for Status Codes

// router.post('/users',(req,res)=>{
//     const user = new User(req.body)
//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// })
//Refactoring POST /users end point
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.send({user,token})//Shorthanded syntax
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login',async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        //res.send({user:user.getPublicProfile(),token})//Shorthanded syntax
        res.send({user,token})//Shorthanded syntax
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/users/logout',auth,async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth,async (req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// router.get('/users',(req,res)=>{
//     User.find({}).then((users)=>{
//         res.send(users)
//     }).catch((e)=>{
//         res.status(500).send()
//     })
// })

//Refactoring GET /users end point
router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

// router.get('/users/:id',(req,res)=>{
//     const _id = req.params.id
//     User.findById(_id).then((user)=>{
//         console.log(user)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }).catch((e)=>{
//         res.status(500).send()
//     })
// })

router.get('/users/me', auth, async (req, res) => {
        res.send(req.user)
})
//Refactoring GET /users/:id end point
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/me',auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates =['name','email','password','age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try {
    // const user =  await User.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true}) //---> Performs operation directly on database and bypasses mongoose middleware
       updates.forEach((update)=>req.user[update] = req.body[update])
       await req.user.save()
       res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/users/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates =['name','email','password','age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try {
    // const user =  await User.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true}) //---> Performs operation directly on database and bypasses mongoose middleware
       const user = await User.findById(req.params.id)
       updates.forEach((update)=>user[update] = req.body[update])
       await user.save()
       if(!user){
            return res.status(404).send()
       }
       res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth, async (req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.user._id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }

})

router.delete('/users/:id',async (req,res)=>{
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


// router.delete('/users/me',auth, async (req,res)=>{
//     try {
//         await req.user.remove() //This is not working might be the remove method is deprecreated
//         res.send(req.user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

module.exports = router