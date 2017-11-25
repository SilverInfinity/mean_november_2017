import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Thing } from '../thing';
import { ThingService } from '../thing.service';
@Component({
  selector: 'app-edit-thing',
  templateUrl: './edit-thing.component.html',
  styleUrls: ['./edit-thing.component.css']
})
export class EditThingComponent implements OnInit {
	things: Thing[];
	editThing: Thing;
	constructor(
		private _userServ :UserService,
		private _thingServ :ThingService
	) { 
		this.editThing = new Thing();
	}

	ngOnInit() {
		this._userServ.getThings(
			(things)=>{
				this.things = things;
			},
			console.log
		)
	}
	

}
