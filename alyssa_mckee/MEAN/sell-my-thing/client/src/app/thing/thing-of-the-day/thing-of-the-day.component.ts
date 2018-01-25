import { Component, OnInit } from '@angular/core';
import { ThingService } from '../thing.service';
import { Thing } from '../thing';
@Component({
  selector: 'app-thing-of-the-day',
  templateUrl: './thing-of-the-day.component.html',
  styleUrls: ['./thing-of-the-day.component.css']
})
export class ThingOfTheDayComponent implements OnInit {
	thing;
	constructor(
		private _thingServ :ThingService
	) { }

	ngOnInit() {
		this.thing = new Thing();
		this._thingServ.getAllThings(
			(res)=>{
				const things = res.data;
				this.thing = things[Math.floor(Math.random()*things.length)];
			},
			console.log
		)
	}

}
