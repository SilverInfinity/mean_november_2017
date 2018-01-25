import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

	constructor(
		private _userServ :UserService,
		private _route :Router
	) { }

	ngOnInit() {
		if (!this._userServ.currentUser.data){
			this._route.navigateByUrl("/");
		}
	}

}
