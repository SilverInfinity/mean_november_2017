import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';
@Component({
	selector: 'app-note-list',
	templateUrl: './note-list.component.html',
	styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
	notes;
	constructor(private _noteServe :NoteService) {
		
	}

	ngOnInit() {
		this._noteServe.retrieveNotes((notes)=>{
			this.notes = notes;
			console.log(this.notes);
		})
	}

}
