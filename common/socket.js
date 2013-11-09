var socket = module.exports = exports = {};
var socketio = require('socket.io');
var chat = require('../models/chat.js');

socket.start = function(server){
	socketio.listen(server).on('connection', function (socket) {
	    socket.on('message', function (msg) {
	    	var newChat = new chat(msg);
	    	newChat.save(function(res){
	    		if(res==null){
	    			socket.broadcast.emit('message', msg);
	    		}
	    	});
	        
	    });
	});
}