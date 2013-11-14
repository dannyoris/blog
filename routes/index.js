
var chat = require('../models/chat.js');
/*
 * GET home page.
 */
var IndexPage = exports = module.exports = {};

IndexPage.showname = function(req,res){
	if(req.session.user==null){
		return res.redirect('/login');
	} 
	res.render('layout',{title:'Blog',user:req.session.user});
}

IndexPage.showLogin = function(req,res){
	res.render('layout',{title:'Login',user:req.session.user});
}

IndexPage.showReg = function(req,res){	
	res.render('layout',{title:'Register',user:req.session.user});
}

