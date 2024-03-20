const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})

// const path = require('path')
// const http = require('http')
// const express = require('express')
// const socketio = require('socket.io')
// const Filter = require('bad-words')
// const { generateMessage,generateLocationMessage } = require('./utils/messages')

// const app = express()
// const server = http.createServer(app)
// const io = socketio(server)

// const port = process.env.PORT || 3000
// const publicDirectoryPath = path.join(__dirname, '../public')

// app.use(express.static(publicDirectoryPath))

// let count = 0

// //server(emit) -> client(receive) - countUpdated
// //client(emit) -> server(receive) - increment
 
// io.on('connection',(socket)=>{
//     console.log("New Web Socket Connection!")
//     socket.on('join', ({ username, room }) => {
//         socket.join(room)

//         socket.emit('message', generateMessage('Welcome!'))
//         socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`))

//         // socket.emit, io.emit, socket.broadcast.emit
//         // io.to.emit, socket.broadcast.to.emit
//     })

//     //socket.emit('message', 'Welcome!')
//     //OR
//     //socket.emit('message', generateMessage('Welcome!'))

//     // socket.broadcast.emit('message','A new user has joined!')
//     //OR
//     //socket.broadcast.emit('message',generateMessage('A new user has joined!'))

//     socket.on('sendMessage', (message,callback) => {
//         const filter = new Filter()
//         if (filter.isProfane(message)) {
//             return callback('Profanity is not allowed!')
//         }
//         io.to('Center City').emit('message', generateMessage(message))
//         //io.emit('message', generateMessage(message))
//         callback()
//     })
//     socket.on('sendLocation', (coords,callback) => {
//         //io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
//         //OR
//         io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
//         callback()
//     })
//     socket.on('disconnect',()=>{
//         // io.emit('message','A user has left!')
//         //OR
//         io.emit('message', generateMessage('A user has left!'))
//     })
//     // socket.emit('countUpdated',count)
//     // socket.on('increment',()=>{
//     //     count++
//     //     //socket.emit('countUpdated',count)//Will emit to only to associated connection
//     //     io.emit('countUpdated',count)////Will emit to all the associated connections
//     // })
// })

// server.listen(port, () => {
//     console.log(`Server is up on port ${port}!`)
// })