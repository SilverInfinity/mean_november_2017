var mongoose = require("mongoose");
var db_name = "marketplace";

mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/'+ db_name,{useMongoClient: true});
	
var ThingSchema = new mongoose.Schema({
	title: {
		type: String, 
		required: true, 
		minlength: 3
	},
	description: {
		type: String, 
		required: true, 
		minlength: 10, 
		maxlength: 200
	},
	price: {
		type: String, 
		required: true, 
		validate:{
			validator: function(v){
				return /^[1-9]+\d*(=?\.\d{2})?$/.test(v);
			},
			message: 'price must be at least $1 and in a valid format: 1 or 1.00'
		}
	},
	location: {
		type: String, 
		required: true
	},
	user: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' 
	},
	image: {
		type: String, 
		required: true
	} //? the image path
	
},{timestamps: true});

var Thing = mongoose.model('Thing', ThingSchema)

module.exports = Thing;