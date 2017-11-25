interface ThingInterface{
	title: string;
	description: string;
	price: string;
	location: string;
	image: string;
	user: string;
}

export class Thing implements ThingInterface{
	title;
	description;
	price;
	location;
	image;
	user;
	constructor(){
		this.title = "";
		this.description = "";
		this.price = "";
		this.location = "";
		this.image = "";
		this.user = "";
	}
}
