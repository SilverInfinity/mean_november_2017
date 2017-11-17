import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
	note :Note;
	constructor(private _noteServe :NoteService ) { 
		this.note = new Note();
	}

	ngOnInit() { }
	
	onSubmit(event){
		event.preventDefault();
		this._noteServe.createNote(this.note);
		this.note = new Note();
	}
}
