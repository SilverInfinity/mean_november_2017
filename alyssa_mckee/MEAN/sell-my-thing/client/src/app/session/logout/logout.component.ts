import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

	constructor(
		private _userServ :UserService,
		private _route :Router
	) { }

	ngOnInit() {
	}
	logout(){
		this._userServ.logout(
		(res)=>{
			this._route.navigateByUrl('/');
		},
		console.log
		)
	}
}
