//declaretion
var express 	= require('express');
var login		= require('./controllers/login');
var home		= require('./controllers/home');
var home2		= require('./controllers/home2');
var home3		= require('./controllers/home3');
var logout		= require('./controllers/logout');
var ejs			= require('ejs');
var exSession 	= require('express-session');
var cookieParser= require('cookie-parser');
var bodyParser	= require('body-parser');
var app			= express();

//configuration
app.set('view engine' , 'ejs');

//middleware

app.use(bodyParser.urlencoded({extended:true}));
app.use(exSession({secret: 'my top secret value', saveUninitialized: true, resave: false}));
app.use(cookieParser());


app.use('/login' , login);
app.use('/home' , home);                    
app.use('/home2' , home2);                    
app.use('/home3' , home3);                    
app.use('/logout' , logout);

//routes
app.get('/' , function(req , res){
	res.send('Assalamu-alaikum');
});

//server-startup
app.listen(3000 , function(){
	console.log('server started at 3000 port!');
});