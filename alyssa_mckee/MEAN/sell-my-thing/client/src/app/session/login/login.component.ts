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
  constructor(
	private _userServ :UserService,
	private _route :Router
  ) { }

  ngOnInit() {
	this.user = new User()
	
  }
  
  onSubmit(event){
	event.preventDefault();
	this._userServ.login(this.user,
		(res)=>{
			//redirect
			this._route.navigateByUrl("/browse");
		},
		console.log
	);
	
	
	this.user = new User()
  }

}
