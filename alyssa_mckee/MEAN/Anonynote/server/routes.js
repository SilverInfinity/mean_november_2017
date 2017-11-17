var Note = require("./controllers/note");
module.exports = (app)=>{
	app.all("*",(req,res,next)=>{console.log(req.method+" request sent to "+req.path); next();})
	app.get("/notes", Note.allNotes);
	
	app.post("/notes", Note.createNote);
	
	app.all('*',(req,res,next)=>{
		res.sendFile(path.resolve("./client/dist/index.html"))
	});
}
