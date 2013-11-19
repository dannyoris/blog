var mongodb = require('./db');
var tool = require('../common/tool.js');

function Post(post){
	this.title = post.title;
	this.content = post.content;
}

module.exports = Post;

Post.prototype.save = function(callback){
	//save
	var info = {
		title:this.title,
		content:this.content,
		view:0,
		time:tool.getTime()
	};

	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('posts',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}

			collection.insert(info,{safe:true},function(err,info){
				mongodb.close();
				callback(null,info);
			});

		});
	});
}

//读取用户信息
Post.get = function(post, callback) {
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }

    db.collection('posts',function(err,collection){
     
      if (err) {
        mongodb.close();
        return callback(err);
      }

      collection.findOne({title:post.title}, function(err, post){
        mongodb.close();
        if (post) {
          return callback(null, post);
        }
        callback(err);
      });
    });
  });
};