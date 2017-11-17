var Note = require("../models/notes");

module.exports={
	createNote: (req,res)=>{
		var note = new Note(req.body);
		note.save((err)=>{
			if (err){
				return res.json({error: err});
			}
			return res.json({note: note});
		})
	},
	allNotes:(req,res)	=>{
		Note.find({},(err, notes)=>{
			if (err){
				return res.json({error: err});
			}
			return res.json({notes: notes});
		})
	}
	
}