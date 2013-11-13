var crypto = require('crypto');
module.exports = Tool = function(){};
Tool.md5 = function(str){
	var md5 = crypto.createHash('md5');
	return md5.update(str).digest('hex');
}

Tool.getTime = function(){
	var date = new Date();
	return {
	  date: date,
	  year : date.getFullYear(),
	  month : date.getFullYear() + "-" + (date.getMonth()+1),
	  day : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
	  minute : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes(),
	  second : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
	}
}