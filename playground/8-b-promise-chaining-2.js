require('../task-manager/src/db/mongoose')
const User = require('../task-manager/src/models/user')
const Task = require('../task-manager/src/models/task')

User.findByIdAndUpdate('65c205436387f9e7ffa4e76a',{age:1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:1})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})

Task.findByIdAndDelete('65c333bad5713745b18f7aea').then((task)=>{
    console.log(task)
    return Task.countDocuments({completed:false})
}).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})