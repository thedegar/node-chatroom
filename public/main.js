$(document).ready(function() {
    var socket = io();
    var chat = $('#chat');
    var name = $('#name');
    var messages = $('#messages');

    var addMessage = function(message) {
        messages.prepend('<div>' + message + '</div>');
    };
    
    chat.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = chat.val();
        addMessage('You said : '+message);
        socket.emit('message', message);
        chat.val('');
    });
    
    socket.on('message', addMessage);
    
    name.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var socketName = name.val();
        socket.emit('name',socketName);
    });
});