import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { ListThingComponent } from './thing/list-thing/list-thing.component';
import { ShowUserComponent } from './user/show-user/show-user.component';

const routes: Routes = [ 
		{path: 'listings', 				component: ShowUserComponent},
		{path: 'browse', 				component: ListThingComponent},
		{path: '', pathMatch: "full", 	component: LandingComponent },
	];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
