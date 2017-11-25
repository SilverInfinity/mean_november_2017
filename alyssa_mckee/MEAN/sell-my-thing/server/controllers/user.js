var Users = require('../models/users');

module.exports = {
	create: (req,res)=>{
		if (req.body.password != req.body.password_confirmation){
			return res.json({error_code: 2, error: {message: "passwords don't match"}})
		}
		Users.find({email: req.body.email.toLowerCase()},(err,users)=>{
			if (users.length != 0){
				return res.json({error_code: 3, error: {message: "email already taken"}})
			}
			var user = new Users(req.body)
			user.save((err)=>{
				if (err){
					return res.json({error_code: 1, error: err});
				}
				req.session.user_id = user._id;
				return res.json({error_code: 0, error: null, data: user._id});
			})
		})
	},
	all: (req,res)=>{	//should I be sending all the user info? password and all?
		Users.find({},'-password',(err, users)=>{
			if (err){
				return res.json({error_code: 1, error: err});
			}
			
			return res.json({error_code: 0, error: null, data: users})
		});
	},
	findOne: (req,res)=>{
		Users.find({_id: req.params.id}, '-password', (err, user)=>{
			if (err){
				return res.json({error_code: 1, error: err});
			}
			
			return res.json({error_code: 0, error: null, data: user})
		});
	},
	findWithThings: (req, res)=>{
		Users.findOne({_id: req.params.id}, '-password').populate('things').exec((err,user)=>{
			if (err){
				return res.json({error_code: 1, error: err});
			}
			return res.json({error_code: 0, error: null, data: user})
		});
	}
}