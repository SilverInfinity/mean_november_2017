module.exports=(function(){
	var mongoose = require("mongoose");
	var db_name = "Notes"

	mongoose = require('mongoose');
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://localhost/'+ db_name,{useMongoClient: true});
	
	
	var NoteSchema = new mongoose.Schema({
		content: {type: String, required: true, minlength: [3,"Note must have a minimum length of 3"]}
	},{timestamps: true});
	
	var Note = mongoose.model("Note", NoteSchema);

	return Note;

})();