const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket-io');
const socket = io();
const {addUser,getRoomList,removeUserFromRoom} = require('user.js');
io.on("connection",socket=>{
        socket.on('joinRoom',({username,room})=>{
                const addedUser = addUser(socket,username,room);
                socket.broadcast.to(socket.id).emit('listRooms',getRoomList(username));
                io.emit('online',addedUser);
                socket.join(addedUser.room)
                socket.broadcast.to(addedUser.room),emit('joinchat',`${addedUser.name} joined the chat room ${addedUser.room}`);

        })
        socket.on('sendMessage',({username,room,message})=>{
                socket.broadcast.to(room).emit('getMessage',`${username} typed ${message}`);
        })
        socket.on('leaveRoom',({username,room})=>{
                removeUserFromRoom(username,room);
        })
})
server.listen(3000,()=>{
        console.log("Server listening on port 3000");
})