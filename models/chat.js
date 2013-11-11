var mongodb = require('./db');
var date = new Date();
var time = {
  date: date,
  year : date.getFullYear(),
  month : date.getFullYear() + "-" + (date.getMonth()+1),
  day : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
  minute : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes(),
  second : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}

function Chat(info){
	console.log(info);
	this.username = info.username;
	this.message = info.message;
}

module.exports = Chat;

Chat.prototype.save = function(callback){
	var info = {
		username:this.username,
		message:this.message,
		time:time
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

			collection.insert(info,{safe:true},function(err,info){
				mongodb.close();
				callback(null);
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

			collection.find(key,{safe:true},function(err,data){
				mongodb.close();
				callback(null);
			});

		});
	});
}