var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var clientCount = 0;
var usersConnected = [];

io.on('connection', function (socket) {
    clientCount+=1;
    console.log('Client connected: Total '+clientCount+' users connected');

    socket.on('message', function(message) {
        console.log('Received message:', socket.name+' : '+message);
        socket.broadcast.emit('message', socket.name+' : '+message);
    });
    
    //Tell all clients when a user disconnects
    socket.on('disconnect', function() {
        clientCount-=1;
        console.log('Client disconnected: Total '+clientCount+' users connected');
        socket.broadcast.emit('message', 'someone disconnected');
    });
    
    //Allow a nickname
    socket.on('name', function(name) {
        socket.name = name;
        socket.broadcast.emit('message', socket.name+' joined');
        usersConnected.push(name);
        //***Problem***clientName gets overwritten when an nth user puts in their name
        //***Solved***socket.name gives each socket a distinct name
    });
});

server.listen(8080);