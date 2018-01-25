import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { ThingService } from './thing/thing.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	currentUser;
	constructor(
		private _userServ :UserService,
		private _route :Router,
		private _thingServ :ThingService
	){ this.currentUser = {data: undefined}; }
	
	ngOnInit(){
		this._userServ.getCurrentUser((user)=>{this.currentUser = user
			if (!this.currentUser.data){
				this._route.navigateByUrl("/");
			}
		}, console.log);
		this._thingServ.getAllThings(console.log,console.log);
	}
}
