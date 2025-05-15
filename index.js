const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Permet toutes les origines pour les tests locaux
        methods: ["GET", "POST"]
    }
});

const connectedUsers = new Map();

class User {
    constructor(UserId, username = "Anonymous", Zone = "ALL") {
        this.userid = UserId;
        this.username = username;
        this.zone = Zone;
    }
}

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    const newUser = new User(socket.id);
    connectedUsers.set(socket.id, newUser);
    io.emit('connectedUsers', Array.from(connectedUsers.values()));

    socket.on('message', (message) => {
        io.emit('message', message);
    });





    socket.on('UsurNameSend', (PlayerUserName) => {
        const user = connectedUsers.get(socket.id);
        if (user) {
            user.username = PlayerUserName;
            io.emit('connectedUsers', Array.from(connectedUsers.values()));
        }
    });


    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        connectedUsers.delete(socket.id);
        io.emit('connectedUsers', Array.from(connectedUsers.values()));
    });
});

server.listen(3000, () => console.log('✅ Socket.IO écoute sur le port 3000'));