/*
 * GET home page.
 */
var IndexPage = exports = module.exports = {};

IndexPage.render = function(req,res){
	/*if(req.session.user==null){
		return res.redirect('/login');
	} */
	res.render('layout');
}

