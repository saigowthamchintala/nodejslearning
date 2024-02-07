const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient //To Connect to the Database to perform the basic Crud Operations
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)
    db.collection('users').insertOne({
        name:'Andrew',
        age:27
    })
})
