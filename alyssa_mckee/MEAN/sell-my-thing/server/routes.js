var Thing 	= require('./controllers/thing');
var User 	= require('./controllers/user');
var Session = require('./controllers/session');
var path 	= require('path');
module.exports = function(app){
	//debugging	
	app.all('*', (req,res,next)=>{console.log(req.method+" request sent to "+ req.path+"/n"); next();})
	app.post('*',(req,res,next)=>{console.log("/nrequest body: "+ JSON.stringify(req.body)+"/n"); next();})
	
	
	//Session
	app.get('/session', Session.find);	//get logged in data?
	app.post('/session', Session.create);	//login
	app.delete('/session', Session.destroy); //logout
	
	//Users
	app.get('/users', User.all);
	app.post('/users',User.create);		//create user
	app.get('/users/:id',User.findOne);	//get user
	app.get('/users/:id/things', Thing.findByUser);
	//Things
	app.post('/uploads', Thing.upload);	//upload image?
	app.post('/things', Thing.create);	//create thing
	app.get('/things', Thing.all);		// get all the things
	app.get('/things/:id', Thing.findOne);	//get a thing
	app.patch('/things/:id', Thing.update);	//fix a thing
	app.delete('/things/:id', Thing.destroy); //trash a thing
	
	//this should be last
	app.all('*',function(req,res,next){
		res.sendFile(path.resolve("./client/dist/index.html"))
	});
}


