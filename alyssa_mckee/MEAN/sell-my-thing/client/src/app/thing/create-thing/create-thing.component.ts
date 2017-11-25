import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Thing } from '../thing';
import { UserService } from '../../user/user.service';
import { ThingService } from '../thing.service';

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
	
	constructor(
		private _thingServ :ThingService,
		private _userServ :UserService
	) { 
		//this.newThing = new Thing();
		this.newThing = {};
	}

	ngOnInit() {

	}
	onCreate(event){
		console.log("oncreate")
		event.preventDefault();
		console.log(this.newThing)
		console.log("thingoooo", this.newThing.image)
		console.log(typeof this.newThing.image);
		
		//call thing service make a thingo
		this._thingServ.createThing(this.newThing,
			(thing)=>{
				this._userServ.currentUser.data.things.push(thing);
			},
			console.log
		)
		this.newThing = {};
	}
	/* v-this is from a tutorial I found. it twrows errors on line 59
	upload(event) {
	event.preventDefault();
    //locate the file element meant for the file upload.
        let inputEl = document.querySelector('#photo');
		console.log("el", inputEl.files)
		
    //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
    //create a new fromdata instance
        let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
                formData.append('image', inputEl.files.item(0));
                
				
				formData.append('title', this.newThing.title);
                formData.append('description', this.newThing.description);
                formData.append('location', this.newThing.location);
                formData.append('price', this.newThing.price);

				this._thingServ.createThing(formData,
					(res)=>{
						console.log("success", res.json());
					},
					console.log
				);
			*/
			/*
            //call the angular http method
            this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
                .post(URL, formData).map((res:Response) => res.json()).subscribe(
                //map the success function and alert the response
                 (success) => {
                         alert(success._body);
                },
                (error) => alert(error))
			
          }
       }*/

}
