var socket = module.exports = exports = {};
var socketio = require('socket.io');

socket.start = function(server){
	socketio.listen(server).on('connection', function (socket) {
	    socket.on('message', function (msg) {
	        socket.broadcast.emit('message', msg);
	    });
	});
}