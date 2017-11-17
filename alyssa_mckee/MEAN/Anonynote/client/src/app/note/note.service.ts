import { Injectable } from '@angular/core';
import { Note } from './note';
import { Http } from '@angular/http';

@Injectable()
export class NoteService {
	notes;
	constructor(private _http :Http ) { }
  
	retrieveNotes(callback) :void{
		this._http.get("/notes").subscribe(
			(notes)=>{
				let res = notes.json();
				if (res.error){
					console.log(res.error);
				}
				else{			
					this.notes = res.notes;
					callback(this.notes);
				}
			},
			(err)=>{
				console.log(err.json());
			}
		);
	}
	createNote(note){
		this._http.post("/notes", note ).subscribe(
			(note)=>{
				let res = note.json();
				if (res.error){
					console.log("error creating note", res.error );
				}
				else{
					this.notes.push(res.note);
				}
			},
			(err)=>{
				console.log("error reaching route", err);
			}
		);
	}

}
