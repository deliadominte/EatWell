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
        console.log(users);
        for(i in users){
            if(users[i]==data.id_reciver)
             flag=true; //e online 
             console.log(data.id_reciver+" "+users[i]);
        }
        if(flag==false){
            console.log("cica nu e lice");
            io.sockets.emit('not_online', data);
        }
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });

});