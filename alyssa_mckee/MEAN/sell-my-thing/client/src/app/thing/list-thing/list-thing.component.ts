import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { Thing } from '../../thing/thing';
import { ThingService } from '../../thing/thing.service';
@Component({
  selector: 'app-list-thing',
  templateUrl: './list-thing.component.html',
  styleUrls: ['./list-thing.component.css']
})
export class ListThingComponent implements OnInit {
	currentUser;
	things;
	filter;
	searchQuery;
	contacting;
	constructor(
		private _router :Router,
		private _userServ :UserService,
		private _thingServ :ThingService
	) { 
		this.things = {
			data: []
		};
		this.filter = "";
		this.searchQuery = "";
		this.contacting = "";
	}

	ngOnInit() {
		this.currentUser = this._userServ.currentUser;
		if (!this.currentUser.data){
			this._router.navigateByUrl("/");
		}
		this.things = this._thingServ.things;
		this.contacting = "";
	}
	
	search(event){
		event.preventDefault()
		this.filter = this.searchQuery.toLowerCase();
		this.searchQuery = "";
	}
	
	reset(){
		this.filter = "";
	}
	showContactFor(thing){
		if (this.contacting == thing._id)
			this.contacting = "";
		else
			this.contacting = thing._id;
	}
}
