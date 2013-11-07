var crypto = require('crypto');
module.exports = Tool = function(){};
Tool.md5 = function(str){
	var md5 = crypto.createHash('md5');
	return md5.update(str).digest('hex');
}