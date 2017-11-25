var Users = require('../models/users');
var bcrypt = require('bcrypt-as-promised');
module.exports = {
	is_logged_in: (req, res, next) => {
		if (req.session.user_id)
			next();
		else{
			console.log("rejected");
			res.redirect('/login');
		}
	},	
	find: (req,res)=>{
		Users.findOne({_id: req.session.user_id}, '-password', (err, user)=>{
			if (err){
				return res.json({error_code: 1, err_desc: err});
			}
			return res.json({error_code: 0, err_desc: null, data: user});
		})
	},
	create: (req,res)=>{
		if(req.body.email == ""){
			return res.json({error_code:1, err_desc: {message: "email can not be empty"}});
		}
		if (req.body.password == ""){
			
			return res.json({error_code:2, err_desc: {message: "password can not be empty"}});
		}

		req.body.email = req.body.email.toLowerCase();
		Users.findOne({email: req.body.email}, (err,user) =>{			
			if (!user){
				
				return res.json({error_code:3, err_desc: {message: "Email does not exist"}});
			}
			bcrypt.compare(req.body.password, user.password)
			.then(() => {				
				req.session.user_id = user._id;
					
					//
					//	REMOVE PW FROM USER BEFORE RETURNING
					//
					delete user.password;
					
				return res.json({error_code:0, err_desc: null, data: user});
			})
			.catch((x) => {
				return res.json({error_code:4, err_desc: {message: "Password Incorrect"}});
			})
		})
		
		//return the user to angular to keep track of as well
	},
	destroy: (req,res)=>{
		if ('user_id' in req.session){
			delete req.session.user_id
			
			return res.json({error_code: 0, err_desc: null})
		}
		
		return res.json({error_code: 1, err_desc: {message: "user not logged in"}})
	}
}