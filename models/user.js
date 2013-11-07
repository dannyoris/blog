var mongodb = require('./db');

function User(user){
	this.name = user.name;
	this.password = user.password;
}

module.exports = User;

User.prototype.save = function(callback){
	//save
	var info = {
		name:this.name,
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
User.get = function(name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();//关闭数据库
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        name: name
      }, function(err, user){
        mongodb.close();//关闭数据库
        if (user) {
          return callback(null, user);//成功！返回查询的用户信息
        }
        callback(err);//失败！返回 err 信息
      });
    });
  });
};