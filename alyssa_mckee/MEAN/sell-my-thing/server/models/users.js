var db_name = "marketplace";

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/'+ db_name,{useMongoClient: true});
var bcrypt = require('bcrypt-as-promised');
	
var UserSchema = new mongoose.Schema({
	name: {
		type: String, 
		required: [true, "Name is required"]
	},
	email: {
		type: String, 
		required: true, 
		unique: true
	},
	password: {
		type: String, 
		required: true
	},
	things: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Thing' 
	}]
},{timestamps: true});

UserSchema.pre('save',function(next){
	var user = this;
	user.email = user.email.toLowerCase();
	
	bcrypt.hash(user.password, 10)
	.then((hashed_password) => {
		user.password = hashed_password;
		next();
	})
	.catch((error) =>{
		console.log(error);
		user.password = ''; //if it errored I dont want to store their raw password
		next();
	})
})

UserSchema.path('email').validate(function(value, done) {
    this.model('User').count({ email: value }, function(err, count) {
        if (err) {
            return done(err);
        } 
        // If `count` is greater than zero, "invalidate"
        done(!count);
    });
}, 'Email already exists');

var User = mongoose.model('User', UserSchema)

module.exports = User;