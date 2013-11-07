
/*
 * GET home page.
 */
var crypto = require('crypto'),
User = require('../models/user.js');

var IndexPage = exports = module.exports = {};

IndexPage.showname = function(req,res){
	res.render('index',{title:'Blog'});
}

IndexPage.showLogin = function(req,res){
	res.render('login',{title:'Login'});
}


IndexPage.showReg = function(req,res){
	res.render('reg',{
						title:'Register',
						error:''
					});
}

IndexPage.doReg = function(req,res){
	var username = req.body.username,
		password = req.body.password;
	
	var newUser = new User({
		username:username,
		password:password
	});

	User.get(username,function(err,user){
		if(err){
			return req.flash('error', err);
		}
		if(user){
			return res.render('reg',{title:'',error:'重复'});
		}
		newUser.save(function(err){
			if (err) {
		        req.flash('error', err);
		        return res.redirect('/reg');
		    }
		    return res.redirect('/login');
		});
	});

	
}
