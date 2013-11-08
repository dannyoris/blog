var mongodb = require('./db');

var time = {
  date: date,
  year : date.getFullYear(),
  month : date.getFullYear() + "-" + (date.getMonth()+1),
  day : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
  minute : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
}

function Chat(info){
	this.username = info.username;
	this.message = info.message;
}