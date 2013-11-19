
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	post = require('./routes/post'),
	index = require('./routes/index'),
	chat = require('./routes/chat'),
  socket = require('./common/socket/socket'),
	http = require('http'),
	path = require('path'),
	MongoStore = require('connect-mongo')(express),
	settings = require('./settings'),
	flash = require('connect-flash');

var app = express(),server;

// all environments
app.set('port', process.env.PORT || 28);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  secret: settings.cookieSecret,
  key: settings.db,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    db: settings.db
  })
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//routes
app.get('/',index.render);
app.get('/home', index.render);
app.get('/reg', index.render);
app.get('/login', index.render);
app.get('/post/add', post.render);
app.get('/post/success', post.success);

app.post('/post/add', post.doAdd);
app.post('/login', user.doLogin);
app.get('/logout', user.doLogout);
app.post('/reg', user.doReg);

//data api
app.get('/getchatdata', chat.showData);
app.get('/getuser', user.getUsername);

server = http.createServer(app).listen(app.get('port'), function(){
	console.log("server listening on port "+app.get('port'));
});


socket.start(server);