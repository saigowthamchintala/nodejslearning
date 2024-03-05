const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth =  async (req,res,next) =>{
    // console.log("Auth Middleware")
    // next()
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({error:'Plese Authenticate.'})
    }
}

module.exports = auth