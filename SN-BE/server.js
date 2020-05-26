const express = require('express')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const bodyParser = require('body-parser')
const { mountRoutes } = require("./routes")

mountRoutes(app)
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use("/uploads", express.static("uploads"))
mongoose.connect('mongodb://localhost/SN', {
    useNewUrlParser:
        true
}).then(() =>
    console.log('connected to mongodb'))
    .catch((err) =>
        console.error('could not connect to mongodb', err))

io.on('connection', (socket) => {
    console.log('New Connection')

    socket.on('chat', ({ sock }) => {
        socket.broadcast.emit("received", { sock });
    })
    socket.on('disconnect', () => {
        console.log('User has left')
    })
})

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log('listening on', port)
})
