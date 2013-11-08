
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	index = require('./routes/index'),
	http = require('http'),
	path = require('path'),
	MongoStore = require('connect-mongo')(express),
	settings = require('./settings'),
	flash = require('connect-flash');

var app = express(),server;

// all environments
app.set('port', process.env.PORT || 3000);
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
app.get('/', index.showname);
app.get('/test', index.showtest);
app.get('/logout', index.doLogout);
app.get('/login', index.showLogin);
app.post('/login', index.doLogin);
app.post('/reg', index.doReg);
app.get('/reg', index.showReg);


server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//socket
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
    console.log("Connection " + socket.id + " accepted.");
    socket.on('message', function(message){
        console.log("Received message: " + message + " - from client " + socket.id);
    });
    socket.on('disconnect', function(){
        console.log("Connection " + socket.id + " terminated.");
    });
});
