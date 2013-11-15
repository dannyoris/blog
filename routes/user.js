
/*
 * GET users listing.
 */
var tool = require('../common/tool.js'),
userModel = require('../models/user.js');
var User = module.exports = exports = {}


User.getUsername = function(req,res){
	return res.json({username:req.session.user});
}

User.doLogout = function(req,res){	
	req.session.user = null;
	res.redirect('/home');
}

User.doLogin = function(req,res){


	var username = req.body['username'],
		password = tool.md5(req.body['password']);

	userModel.get({
		username:username
	},function(err,data){
		if(err){
			return res.json({error:'账号或者密码错'});
		}
		data = eval(data);
		if(data==null){
			return res.json({error:'账号错'});
		}
		if(data.password!=password){
			return res.json({error:'密码错'});
		}
		req.session.user = username;
		return res.json({success:username});
	});
}


User.doReg = function(req,res){
	var username = req.body.username,
		password = req.body.password;
	var newUser = new userModel({
		username:username,
		password:tool.md5(password)
	});

	userModel.get({username:username},function(err,user){
		if(err){
			return res.json({error:err});
		}
		if(user){
			return res.json({error:"重复"});
		}
		newUser.save(function(err){
			if (err) {
		        return res.json({error:err});
		    }		    
			return res.json({success:username});
		});
	});
}
