import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user';
@Injectable()
export class UserService{
	currentUser;
	users: User[];
	constructor(private _http :Http) { this.currentUser = {data: undefined}; }
	createUser(user :User, cb, eb) {
		this._http.post('/users', user).subscribe(
			(res)=>{
				console.log("LOGGING",res.json());
				if (res.json().error_code == 0){
					console.log("no error")
					const user_id = res.json().data;
					
					user._id = user_id;
					delete user.password;
					delete user.password_confirmation;
					console.log("asjkdhfa;klsjdf;akjshdf",user);
					this.currentUser.data = user;
					
					cb(this.currentUser);
				}
				else{
					console.log("error");
					eb(res);
				}
			},
			(err)=>{
				console.log('legit error');
				eb(err);
			}
		)
	}
	
	getCurrentUser(cb,eb){
		console.log('getting current user');
		this._http.get('/session').subscribe(
			(res)=>{
				if (res.json().error_code ==0){
					const user = res.json().data
					this.currentUser.data = user;
					cb(this.currentUser);
				}
				else{
					eb(res);
				}
			
			},
			(err)=>{
				eb(err);
			}
		)
	}
	login(user, cb,eb){
		this._http.post('/session', user).subscribe(
			(res)=>{
				if (res.json().error_code == 0){
					const user = res.json().data;
					this.currentUser.data = user;
					cb(res);
				}
				else{
					console.log(res)
					eb(res)
				}
			},
			eb
		)
	}
	logout(cb,eb){
		this._http.delete('/session').subscribe(
			(res)=>{
			console.log("del",this.currentUser)
				this.currentUser.data = undefined;
				cb(res);
			},
			eb
		)
	}
	getThings(cb,eb){
		this._http.get('/users/'+ this.currentUser.data._id+'things').subscribe(
			(res)=>{
				if (res.json().error_code == 0){
					const things = res.json().data;
					cb(things);
				}
				else{
					eb(res);
				}
			},
			eb
		)
	}
	
}
