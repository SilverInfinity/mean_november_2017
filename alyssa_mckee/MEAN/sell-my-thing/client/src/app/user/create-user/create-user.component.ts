import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
	user :User;
	message :string;
	constructor(
		private _userServ: UserService,
		private _route :Router
		) {}

	ngOnInit() {
		this.user = new User();
		this.message = "";
	}
	
	onSubmit(event){
		event.preventDefault();
		this.message = "";
		this._userServ.createUser(this.user, 
			(user_id)=>{
				//go to /listings
				this._route.navigateByUrl('/browse');
			},
			(res)=>{
				const err = res.json()
				//display errors
				this.message = err.err_desc.message;
				console.log('wat?');
				console.log(err);
			}
		)
		
		this.user= new User();
	}

}
