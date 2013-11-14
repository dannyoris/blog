
var chat = require('../models/chat.js');

Chat = module.exports = exports = {};

Chat.showData = function(req,res){
	chat.get({},function(error,data){
		res.send(data);
	});
}