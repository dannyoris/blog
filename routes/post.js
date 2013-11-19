
/*
 * GET users listing.
 */
var postModel = require('../models/post.js');
var Post = module.exports = exports = {}


Post.render = function(req,res){
	if(req.session.user){
		res.render('layout_post');
	} else{		
		res.redirect('/login');
	}
}

Post.success = function(req,res){
	/*if(req.session.user==null){
		return res.redirect('/login');
	} */
	res.render('success',{redirect:'/post/add'});
}

Post.doAdd = function(req,res){
	var title = req.body.title,
		content = req.body.content;

	var newPost = new postModel({
		title:title,
		content:content
	});

	postModel.get({title:title},function(err,post){
		if(err){
			return res.json({error:err});
		}
		if(post){
			return res.json({error:"重复"});
		}
		newPost.save(function(err){
			if (err) {
		        return res.json({error:err});
		    }		    
			res.render('success',{redirect:'/post/add'});
		});
	});
}
