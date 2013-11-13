var mongodb = require('./db');
var tool = require('../common/tool.js');

function Chat(info){
	this.username = info.username;
	this.message = info.message;
}

module.exports = Chat;

Chat.prototype.save = function(callback){
	var info = {
		username:this.username,
		message:this.message,
		time:tool.getTime()
	}

	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('chat',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}

			collection.insert(info,{safe:true},function(err){
				mongodb.close();
				callback(null,info.time.second);
			});

		});
	});
}

Chat.get = function(key,callback){

	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('chat',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}

			collection.find(key)
						.sort({time:-1})
					    .toArray(function(err,data){
							mongodb.close();
							if(err){
								callback(err);
							}		
							callback(err,data);		   	
					    });

		});
	});
}