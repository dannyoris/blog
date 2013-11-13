var socket = module.exports = exports = {};
var socketio = require('socket.io');
var chat = require('../models/chat.js');

socket.start = function(server){
	socketio.listen(server).on('connection', function (socket) {
	    socket.on('message', function (msg) {
	    	var _cc = msg.split('$-$-$'),
	    		_send = {
	    			username:_cc[0],message:_cc[1]
	    		};
	    	var newChat = new chat(_send);
	    	newChat.save(function(res,time){
	    		if(time){
	    			_send.time = time;
	    			socket.broadcast.emit('message', _send);
	    			socket.emit('message', _send);
	    		}
	    	});
	        
	    });
	});
}