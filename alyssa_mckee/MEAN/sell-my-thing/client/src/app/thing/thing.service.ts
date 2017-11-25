import { Injectable } from '@angular/core';
import { Thing } from './thing';
import { Http } from '@angular/http';
@Injectable()
export class ThingService {
	things: Thing[];
	constructor(
		private _http :Http
	) { }
	
	getAllThings(cb,eb){
		this._http.get('/things').subscribe(
			(res)=>{
				if (res.json().error_code == 0){
					this.things = res.json().data;
					console.log("things",this.things);
					cb(this.things);
				}
				else{
					eb(res);
				}
			},
			eb
		)
	}
	createThing(thing, cb, eb){
	console.log("creatething serv")
		this._http.post('/things', thing).subscribe(
			(res)=>{
				console.log("resp")
				if (res.json().error_code == 0){
					const thing = res.json().data;
					this.things.push(thing);
					cb(thing);
				}
				else{
					eb(res);
				}
			
			},eb)
	}
	
}
