
/*
 * GET home page.
 */
var tool = require('../common/tool.js'),
User = require('../models/user.js');

var IndexPage = exports = module.exports = {};




IndexPage.showname = function(req,res){
	res.render('index',{title:'Blog',user:req.session.user});
}

IndexPage.showtest = function(req,res){
	res.render('index',{title:'Blog',user:req.session.user});
}

IndexPage.showLogin = function(req,res){
	console.log(req.session.user);
	res.render('login',{title:'Login',user:req.session.user,error:''});
}

IndexPage.showReg = function(req,res){	
	res.render('reg',{title:'Register',user:req.session.user,error:''});
}

IndexPage.doLogout = function(req,res){	
	req.session.user = null;
	return res.redirect('/');
}

IndexPage.doLogin = function(req,res){
	var username = req.body.username,
		password = req.body.password;

	User.get({
		username:username,
		password:tool.md5(password)
	},function(err,user){
		if(err){
			//return res.render('login',{title:'',error:'账号或者密码错'});
		}
		req.session.user = username;
		return res.redirect('/');
	});
}


IndexPage.doReg = function(req,res){
	var username = req.body.username,
		password = req.body.password;
	var newUser = new User({
		username:username,
		password:tool.md5(password)
	});

	User.get({username:username},function(err,user){
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
