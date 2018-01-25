import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	user :User;
	message: string;
	constructor(
		private _userServ :UserService,
		private _route :Router
	) { }

	ngOnInit() {
		this.user = new User()
		this.user.email = "ki@digiworld.net"
		this.user.password = "password"
		this.message = "";
		console.log("login init");
	}
  
	onSubmit(event){
		event.preventDefault();
		console.log("onSubmit");
		this.message = "";
		this._userServ.login(this.user,
			(res)=>{
				console.log("success");
				this.user = new User()
				this._route.navigateByUrl("/browse");
			},
			(res)=>{
				console.log("error");
				const err = res.json();
				this.message = err.err_desc.message;
				console.log(this.user);
			}
		);
	}

}
