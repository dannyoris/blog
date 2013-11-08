
/*
 * GET users listing.
 */
var tool = require('../common/tool.js'),
userModel = require('../models/user.js');
var User = module.exports = exports = {}

User.doLogout = function(req,res){	
	req.session.user = null;
	return res.redirect('/');
}

User.doLogin = function(req,res){
	var username = req.body.username,
		password = req.body.password;

	userModel.get({
		username:username,
		password:tool.md5(password)
	},function(err,data){
		if(err){
			return res.render('login',{title:'',error:'账号或者密码错'});
		}
		if(data==undefined){
			return res.render('login',{title:'',error:'账号或者密码错'});
		}
		req.session.user = username;
		return res.redirect('/');
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
			return res.redirect('/reg');
		}
		if(user){
			return res.render('reg',{title:'',error:'重复'});
		}
		newUser.save(function(err){
			if (err) {
		        return res.redirect('/reg');
		    }
		    return res.redirect('/login');
		});
	});
}
