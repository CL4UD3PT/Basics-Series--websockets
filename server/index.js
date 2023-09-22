const express = require('express');
const app = express();

const http = require('http');
const {Server} = require('socket.io');

const cors = require('cors');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8000',
        methods: ['GET', 'POST']
    }
});

// listen on
io.on('connection', (socket) => {
    console.log('User connected: ', socket.id);

    // broadcast message received
    socket.on('send_message', (data) => {
        socket.broadcast.emit('receive_message', data);
    })
})

server.listen(8001, () => {
    console.log('SERVER RUNNING ON PORT 3001')
});