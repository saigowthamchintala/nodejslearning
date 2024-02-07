//Note: During Installing MongoDB, the Version used is 4.0.28
//CRUD Operations Create Read Update Delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient //To Connect to the Database to perform the basic CRUD Operations
// const ObjectID = mongodb.ObjectID

//Destructuring 
const { MongoClient, ObjectID } = require('mongodb')

//Note: Refer https://www.mongodb.com/docs/manual/reference/method/ObjectId/ --> To create own object IDs
// const id = new ObjectID() // This is a constructor function
// console.log(id)
// console.log(id.id)
// console.log(id.id.length)
// console.log(id.toHexString())
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    console.log('Connection to ' + databaseName + ' is Successfull!')
    const db = client.db(databaseName)

    //To insert a collection into MongoDB database with one document:
        db.collection('users').insertOne({
            //_id:id,
            name: 'Andrew',
            age: 27
        })
    //

    //To insert a collection into MongoDB database with one document and error handling:
        // db.collection('users').insertOne({
        //     //_id:id,
        //     name: 'Gowtham',
        //     age: 27
        // },(error,result)=>{
        //     if(error){
        //         return console.log("Unable to insert user.")
        //     }
        //     console.log(result.ops)
        // })
    //

    //To insert a collection into MongoDB database with many documents and error handling:
        // db.collection('users').insertMany([{
        //     'name': 'Jen',
        //     'age': 28
        // }, {
        //     'name': 'Gunther',
        //     'age': 27
        // }], (error, result) => {
        //     if (error) {
        //         return console.log('Unable to insert documents!')
        //     }
        //     console.log(result.ops)
        // })
    //

    /*
    Goal-1:
        Insert 3 tasks into a new tasks collection:
            1.Use insertMany to insert the documents
            -description(string),completed(boolean)
            2.Setup the callback to handle the error or print ops
            3.Run the script
            4.Refresh the database in Robo 3t/Studio 3t and view data in tasks collection
    */

    //Goal-1-Answer:
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
    //

    //To fetch a document using one of its property from a collection in the database:
        // db.collection('users').findOne({name:'Jen'},(error,user)=>{
        //     if(error){
        //         return console.log('Unable to fetch!')
        //     }
        //     console.log(user)
        // })
    //

    //To fetch a document using its properties from a collection in the database:
        // db.collection('users').findOne({name:'Jen',age:'2'},(error,user)=>{
        //     if(error){
        //         return console.log('Unable to fetch!')
        //     }
        //     console.log(user)
        // })
        //Note: findOne returns the first doc if there are multiple docs satisfying the criteria.
    //

    //To fetch a document using ObjectID from a collection in the database:    
        // db.collection('users').findOne({_id: new ObjectID("64957dd8e4e99c3348a113df")},(error,user)=>{
        //     if(error){
        //         return console.log('Unable to fetch')
        //     }
        //     console.log(user)
        // })
    //

    //To fetch multiple document/count of documents using its properties from a collection in the database:
        // db.collection('users').find({age:27}).toArray((error,users)=>{
        //     console.log(users)
        // })

        //Note: .find() always returns a cursor not a callback

        // db.collection('users').find({age:27}).count((error,count)=>{
        //     console.log(count)
        // })
    //


    /*
    Goal-2: 
        Use find and findOne with tasks   
            1. Use findOne to fetch the last task by its id (print doc to console)
            2. Use find to fetch all tasks that are not completed (print docs to console)
            3. Test your work!
    */

    //Goal-2 Answer:
        // db.collection('tasks').findOne({_id:new ObjectID("6495819e39339e135cba34a9")},(error,task)=>{
        //     if(error){
        //         return console.log("Unable to find the task in the Database")
        //     }
        //     console.log(task)
        // })

        // db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
        //     console.log(tasks)
        // })
    //

    //To update a document using ObjectID from a collection in the database:
        // const updatePromise = db.collection('users').updateOne({
        //         _id:new ObjectID("65c0f86b03fe4d33f4a45ba1")
        //     },{
        //         $set:{
        //             name:'Mike'
        //         }
        //     })
        // updatePromise.then((result)=>{
        //     console.log(result)
        // }).catch((error)=>{
        //     console.log(error)
        // })

        // (OR)

        //  db.collection('users').updateOne({
        //         _id:new ObjectID("64943eb6cf81be03e41ea3ab")
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

    //

    /*
    Goal-3: 
        Use updateMany to complete all tasks:
            1.Check the documentation for updateMany
            2.Setup the call with the query and the updates
            3.Use promise methods to setup the success/errorhandlers
            4.Test your work
    */

    //Goal-3 Answer:
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
    //

    // To delete many documents from a collection in database
        // db.collection('users').deleteMany({
        //     age:28
        // }).then((result)=>{
        //     console.log(result)
        // }).catch((error)=>{
        //     console.log(error)
        // })
    //

    /*
    Goal-4: 
        Use deleteOne to remove a task
            1.Grab the description for the task you want to remove
            2.Setup the call with the query
            3.Use the promise methods to setup thr success /error handlers
            4.test your work
    */

    //Goal-4 Answer:
        // db.collection('tasks').deleteOne({
        //     description:"Clean the House"
        // }).then((result)=>{
        //     console.log(result)
        // }).catch((error)=>{
        //     console.log(error)
        // })

    //
})

