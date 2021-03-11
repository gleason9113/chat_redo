const express = require('express');
const http = require('http');
const { addUser, removeUser, getUser, getUsersInChannel } = require('./users.js');
const app = express();
const cors = require('cors');
app.use(cors());
const router = require('./router');
app.use(router);
const server = http.createServer(app);
const socketio = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
});

const PORT = process.env.PORT || 5000;

socketio.on('connection', (socket) => {
    console.log("Client connected!");

    socket.on('join', ({ name, channel }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, channel });

        if(error) return callback(error);

        
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to ${user.channel}`});
        socket.broadcast.to(user.channel).emit('message', { user: 'admin', text: `${user.name} has entered the channel!`});
        socket.join(user.channel);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.channel).emit('message', { user: user.name, text: message});

        callback();
    })

    
    socket.on('disconnect', () => {
        console.log("Disconnected!");
    })
});



server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

