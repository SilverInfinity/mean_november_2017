import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';
import { NoteListComponent } from './note/note-list/note-list.component';
import { AddNoteComponent } from './note/add-note/add-note.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NoteService } from './note/note.service'
@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    NoteListComponent,
    AddNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
	HttpModule
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
