import { Injectable } from '@angular/core';
import { Thing } from './thing';
import { Http } from '@angular/http';
import { UserService } from '../user/user.service';

@Injectable()
export class ThingService {
	things;
	constructor(
		private _http :Http,
		private _userServ :UserService
	) {
		this.things = {
			data:[]
		}
	}
	
	getAllThings(cb,eb){
		this._http.get('/things').subscribe(
			(res)=>{
				if (res.json().error_code == 0){
					this.things.data = res.json().data;
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
					thing.user = this._userServ.currentUser.data;
					this.things.data.push(thing);
					cb(this.things);
				}
				else{
					eb(res);
				}
			
			},eb)
	}
	
}
