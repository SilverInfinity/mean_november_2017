interface UserInterface {
	_id?: string;
	updatedAt?: Date;
	createdAt?: Date;
	name?: string;
	email?: string;
	things?: string[];
	password?: string;
	password_confirmation?: string;
}

export class User implements UserInterface {
	name;
	email;
	things;
	_id;
	updatedAt;
	createdAt;
	password;
	password_confirmation;
	constructor(){
		this.name = "";
		this.email = "";
		this.things = [];
	}
}
