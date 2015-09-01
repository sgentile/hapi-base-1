
(function(){
    "use strict";
    var _ = require('lodash'),
        JWT  = require('jsonwebtoken');

    module.exports = {
        connect: function(io) {
            io.sockets.on('connection', function (socket) {

                socket.connectedRooms = [];

                socket.emit('connected');
                socket.on('user-connnected', function(userToken){
                    var token = JWT.decode(userToken);
                    socket.token = token;
                    //console.log(token.name + ' user-connected');
                });

                socket.on('subscribe', function(data) {
                    //you need a token to subscribe...
                    if(socket.token) {
                        //we don't want to keep joining a room they are already joined too
                        var room = _.find(socket.connectedRooms, function (r) {
                            return r === data.room;
                        });
                        if (room) {
                            console.log('already subscribed to ' + data.room);
                        } else {
                            //before we allow the user to subscribe, check if they are allowed to get messages....
                            socket.join(data.room);
                            socket.connectedRooms.push(data.room);
                        }
                    }
                });

                socket.on('disconnect', function(){
                    //console.log('socket disconnected');
                });
            });
        }
    };
})();
