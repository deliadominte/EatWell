var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(5500, function () {
    console.log('listening for requests on port 5500,');
});
var users = {};

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);
    socket.on('login', function (data) {
        console.log('a user ' + data.userId + ' connected');
        //saving userId to array with socket ID
        users[socket.id] = data.userId;
    });
    socket.on('disconnect', function () {
        console.log('user ' + users[socket.id] + ' disconnected');
    });
    // Handle chat event
    socket.on('chat', function (data) {
        // console.log(data);
        var i,flag=false;
        for(i in users){
            if(i==data.id_sender)
             flag=true; //e online 
        }
        if(flag==false){
            io.sockets.emit('nu_e_live', data);
        }
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });

});