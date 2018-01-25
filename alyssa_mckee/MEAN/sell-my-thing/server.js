var port = 8000;

var express = require("express");
var path = require("path");
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
app.use(session({
	secret: 'moon geese',
    resave: true,
    saveUninitialized: true
	}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads',express.static(path.resolve('./client/uploads')));

app.use(express.static(path.join(__dirname, "./client/dist")));

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
	

require('./server/routes')(app);

app.listen(port, function() {
 console.log("listening on port "+ port);
});
