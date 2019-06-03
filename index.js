var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(5500, function(){
    console.log('listening for requests on port 5500,');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
var io = socket(server);
conversations = {};

io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);
    

    // // Handle chat event
    // socket.on('send_chat', function(data){
    //     // console.log(data);
    //     //io.sockets.emit('chat', data);

        

    //     var conversation_id = data.conversation_id;
    
    //     if (conversation_id in conversations) {
    
    //         console.log (conversation_id + ' is already in the conversations object');
    
    //         // emit the message [data.message] to all connected users in the conversation
    
    //     } else {
    //         socket.conversation_id = data;
    //         conversations[socket.conversation_id] = socket;
    
    //         conversations[conversation_id] = data.conversation_id;
    
    //         console.log ('adding '  + conversation_id + ' to conversations.');
    
    //         // emit the message [data.message] to all connected users in the conversation
    
    //     }

    // });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

    socket.on('subscribe', function(room) {
        console.log('joining room', room);
        socket.join(room);
    });

    socket.on('send_chat', function(data) {
        console.log('sending room post', data.room);
        io.sockets.to(data.room).emit('chat', data);
    });

});