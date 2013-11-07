var mongodb = require('./db');

function User(user){
	this.username = user.username;
	this.password = user.password;
}

module.exports = User;

User.prototype.save = function(callback){
	//save
	var info = {
		username:this.username,
		password:this.password
	};

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

//读取用户信息
User.get = function(user, callback) {
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }

    db.collection('users',function(err,collection){
     
      if (err) {
        mongodb.close();
        return callback(err);
      }

      collection.findOne({username:user}, function(err, user){
        mongodb.close();
        if (user) {
          return callback(null, user);
        }
        callback(err);
      });
    });
  });
};