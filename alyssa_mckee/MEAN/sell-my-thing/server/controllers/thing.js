var fs = require('fs');

var multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req,file,callback){
		callback(null,'./client/dist/uploads/');
	},
	filename: function (req,file,callback) {
		var datetimestamp = Date.now();
		var original_name = file.originalname.split('.')
		callback(null,file.fieldname + '-' + datetimestamp + '.' + original_name[original_name.length-1])
	}
});
var upload = multer({
	storage: storage
}).single('image');

var Users = require('../models/users');
var Things = require('../models/things');

function deleteUpload(filename){
	fs.unlink('./client/dist/uploads/'+filename);
	
}

module.exports={
	upload: (req,res)=>{
		upload(req,res,(err)=>{
			if (err){
				return res.json({error_code: 1, err_desc: err});				
			}
			console.log(req.file);
			return res.json({error_code: 0, err_desc:null,file:req.filename});
		})
	},
	create: (req,res)=>{		
		// var thing = new Things()
		// thing.title = req.body.title
		// thing.description = req.body.description
		// thing.price = req.body.price
		// thing.location = req.body.location
		// //thing.user = req.session.user_id
		// thing.user = req.body.user
		
		upload(req,res,(upload_err)=>{
			console.log("upload the pic")
			console.log("file",req.file)
			console.log("body?", req.body);
			console.log("images?",req.body.image);
			console.log("files?",req.file)
			if (upload_err){
				console.log("lost the pic")
				return res.json({error_code: 1, err_desc: upload_err});				
			}
			//Users.findOne({_id: req.session.user_id})
			Users.findOne({_id: req.body.user},(user_err, user)=>{
				console.log("finding the user");
				if (user_err){
					console.log("lost the user");
					fs.unlink('./client/dist/uploads/'+req.file.filename);
					return res.json({error_code: 2, err_desc: user_err});				
				}
				console.log("create the thing");
				var thing = new Things()
				thing.title = req.body.title
				thing.description = req.body.description
				thing.price = req.body.price
				thing.location = req.body.location
				//thing.user = req.session.user_id
				thing.user = req.body.user
				thing.image = req.file.filename;
				thing.save((save_err)=>{
					console.log("save the thing");
					if (save_err){
						console.log("lost the thing");
						fs.unlink('./client/dist/uploads/'+req.file.filename);
						return res.json({error_code: 3, err_desc: save_err});				
					}
					user.things.push(thing);
					
					Users.update({_id: user._id},user,(user_update_err)=>{
						if (user_update_err){
							fs.unlink('./client/dist/uploads/'+req.file.filename);
							return res.json({error_code: 4, err_desc: user_update_err});				
						}
						
						console.log(req.file);
						return res.json({error_code: 0, err_desc:null, data:{file:req.file, id: thing._id}});
					})
				})	
			})	
		})
	},
	all: (req,res)=>{
		Things.find({},(err, things)=>{
			if (err){
				return res.json({error_code: 1, err_desc: err});				
			}
			return res.json({error_code: 0, err_desc: null, data: things});
		})
	},
	findOne: (req,res)=>{
		Things.findOne({_id: req.params.id},(err, thing)=>{
			if (err){
				return res.json({error_code: 1, err_desc: err});				
			}
			return res.json({error_code: 0, err_desc: null, data: thing});
		})
		
	},
	update: (req,res)=>{
		let thing = new Things(req.body);
		Things.update({_id: req.params.id}, thing, (err)=>{
			if (err){
				return res.json({error_code: 1, err_desc: err})				
			}			
			return res.json({error_code: 0, err_desc: null})
		})		
	},
	destroy: (req,res)=>{
		Things.findOne({_id: req.params.id}, (err, thing)=>{
			
		
			Things.remove({_id: req.params.id}, (err)=>{
				if (err){
					return res.json({error_code: 1, err_desc: err})				
				}
				fs.unlink('./client/dist/uploads/'+thing.image);
				return res.json({error_code: 0, err_desc: null})
			})
		})
	},
	
	
}