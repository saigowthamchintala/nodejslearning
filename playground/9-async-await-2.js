require('../task-manager/src/db/mongoose')
const User = require('../task-manager/src/models/user')
const Task = require('../task-manager/src/models/task')

const updateAgeAndCount = async (id, age)=>{
    const user  = await User.findByIdAndUpdate('65c205436387f9e7ffa4e76a',{age:age})
    const count = await User.countDocuments({age:age})
    //(OR)
    //const count = await User.countDocuments({age})
    return count
}

const deleteTaskAndCount = async (id)=>{
    const user  = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
    return count
}

// updateAgeAndCount('65c333bad5713745b18f7aea',2).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })

// deleteTaskAndCount('65c333aad5713745b18f7ae8').then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })