
/*
 * GET home page.
 */
var crypto = require('crypto'),
User = require('../models/user.js');

var IndexPage = exports = module.exports = {};

IndexPage.showname = function(req,res){
	res.render('index',{title:'test'});
}

IndexPage.showPostName = function(req,res){
	res.send(req.query.name);
}


IndexPage.showLogin = function(req,res){
	res.render('login',{title:'test'});
}


IndexPage.doReg = function(req,res){
	var name = req.body.name,
		password = req.body.password;

	var newUser = new User({
		name:name,
		password:password
	});

	newUser.save(function(err){
		if (err) {
	        req.flash('error', err);
	        return res.redirect('/reg');
	      }
	});
}
