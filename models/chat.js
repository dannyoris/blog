var mongodb = require('./db');

var time = {
  date: date,
  year : date.getFullYear(),
  month : date.getFullYear() + "-" + (date.getMonth()+1),
  day : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
  minute : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
}

function Chat(info){
	this.username = info.username;
	this.message = info.message;
}

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
		db.collection('users',function(err,collection){
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