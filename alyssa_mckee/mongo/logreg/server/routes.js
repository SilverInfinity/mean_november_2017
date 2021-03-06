var routes = require('./named_routes'),
	session = require('./controllers/session'),
	user = require('./controllers/user');

module.exports = (app) => {
	app.get('/', user['new']);
	
	app.get('/registration', user['new']);
	app.get('/users/new', user['new']);
	
	app.post('/users', user.create);
	
	app.get('/users', user.index);
	
	app.get('/users/:id', user.show);
	
	app.get('/login', session['new']);
	app.get('/session/new', session['new']);
	
	app.post('/session', session.create);
	app.get('/session/destroy', session.destroy);
}