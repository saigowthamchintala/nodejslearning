//CRUD Operation Create Read Update Delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient //TO Connect to the Database to perform the basic Crud Operations
// const ObjectId = mongodb.ObjectID

//Destructuring 
const {MongoClient,ObjectId}= require('mongodb')

// const id = new ObjectId()
// console.log(id)
// console.log(id.getTimestamp())

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api'

MongoClient.connect(connectionURL,{useNewUrlParser:true, useUnifiedTopology: true},(error,client)=>{
    if(error){
        return console.log('Unable to connect to database!')
    }
    // console.log('Connected Correctly!')
    const db = client.db(databaseName)

    //Goal: Use deleteOne to remove a task
    //
    //1.Grab the description for the task you want to remove
    //2.Setup the call with the query
    //3.Use the promise methods to setup thr success /error handlers
    //4.test your work

    // db.collection('tasks').deleteOne({
    //     description:"Clean the House"
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })


    // db.collection('users').deleteMany({
    //     age:28
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
     
    // //Goal: Use updateMany to complete all tasks
    // //
    // //1.Check the documentation for updateMany
    // //2.Setup the call with the query and the updates
    // //3.Use promise methods to setup the success/errorhandlers
    // //4.Test your work
    // //
    // db.collection('tasks').updateMany({
    //     completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })


//    const updatePromise = db.collection('users').updateOne({
//         _id:new ObjectId("64943eb6cf81be03e41ea3ab")

//     },{
//         // $set:{
//         //     name:'Mike'
//         // }
//         $inc:{
//             age:1
//         }
//     }).then((result) => {
//         console.log(result)
//     }).catch((error)=>{
//         console.log(error)
//     })
//     // db.collection('users').findOne({_id: new ObjectId("64957dd8e4e99c3348a113df")},(error,user)=>{
//     //     if(error){
//     //         return console.log('Unable to fetch')
//     //     }
//     //     console.log(user)
//     // })

//     // db.collection('users').find({age:27}).toArray((error,users)=>{
//     //     console.log(users)
//     // })

//     // db.collection('users').find({age:27}).count((error,count)=>{
//     //     console.log(count)
//     // })


// //
// //Goal:Use find and findOne with tasks
// //    
// //1. Use findOne to fetch the last task by its id (print doc to console)
// //2. Use find to fetch all tasks that are not completed (print docs to console)
// //3. Test your work!

//     db.collection('tasks').findOne({_id:new ObjectId("6495819e39339e135cba34a9")},(error,task)=>{
//         if(error){
//             return console.log("Unable to find the task in the Database")
//         }
//         console.log(task)
//     })

//     db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
//         console.log(tasks)
//     })


    // db.collection('users').insertOne({
    //     _id:id,
    //     name:'Andrew',
    //     age:27
    // })
//     db.collection('users').insertMany([{
//         'name':'Jen',
//         'age':28
//     },{
//         'name':'Gunther',
//         'age':27
//     }],(error,result)=>{
//         if(error){
//             return console.log('Unable to insert document!')
//         }
//         console.log(result.ops)
//     })
// //Goal:Insert 3 tasks into a new tasks collection

// //1.Use insertMany to insert the documents
// // -description(string),completed(boolean)
// //2.Setup the callback to handle the error or print ops
// //3.Run the script
// //4.Refresh the dsstabase in Robo 3t/Studio 3t and view data in tasks collection
    // db.collection('tasks').insertMany([{
    //     description:'Clean the House',
    //     completed:true
    // },{
    //     description:'Renew Inspection',
    //     completed:false
    // },{
    //     description:'Pot Plants',
    //     completed:false
    // }],(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert tasks')
    //     }
    //     console.log(result.ops)
    // })

})

