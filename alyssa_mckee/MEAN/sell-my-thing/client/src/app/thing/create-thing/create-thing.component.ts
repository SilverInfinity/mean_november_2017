import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Thing } from '../thing';
import { UserService } from '../../user/user.service';
import { ThingService } from '../thing.service';

import {Router} from '@angular/router';

import { Headers, Http, RequestOptions } from '@angular/http'; 
import { NgForm } from '@angular/forms'; 

const URL = 'http://localhost:8000/things';

import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";


@Component({
  selector: 'app-create-thing',
  templateUrl: './create-thing.component.html',
  styleUrls: ['./create-thing.component.css']
})
export class CreateThingComponent implements OnInit {
	newThing;
	_files;
	validfile = false;
	hideComponent;
	buttonText;
	constructor(
		private _route :Router,
		private _thingServ :ThingService,
		private _userServ :UserService
	) { 
		this.newThing = new Thing();
	}

	ngOnInit() {
		this.hideComponent = true;
		this.buttonText = "Create New Listing";
	}
	private setFile(event) {
		this._files = event.srcElement.files;
		this.validfile = true;
	}
	toggle(){
		this.hideComponent = !this.hideComponent;
		this.buttonText = this.hideComponent? "Create New Listing" : "Cancel";
	}
	upload(event) {
		event.preventDefault();		

        let fileCount: number = this._files.length

        let formData = new FormData();

        if (fileCount > 0) {
			formData.append('title', this.newThing.title);
			formData.append('description', this.newThing.description);
			formData.append('location', this.newThing.location);
			formData.append('price', this.newThing.price.toFixed(2));
			formData.append('image', this._files[0]);
			
			this._thingServ.createThing(formData,
				(res)=>{
					console.log("success", res);
					this._route.navigateByUrl("/browse");
				},
				console.log
			);
			
        }
    }

}
