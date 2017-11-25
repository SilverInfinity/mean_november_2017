import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ThingComponent } from './thing/thing.component';
import { UserComponent } from './user/user.component';
import { SessionComponent } from './session/session.component';

import { LandingComponent } from './landing/landing.component';
	import { CreateUserComponent } from './user/create-user/create-user.component';
	import { LoginComponent } from './session/login/login.component';
	import { ThingOfTheDayComponent } from './thing/thing-of-the-day/thing-of-the-day.component';

import { ListThingComponent } from './thing/list-thing/list-thing.component';

import { ShowUserComponent } from './user/show-user/show-user.component';
	import { CreateThingComponent } from './thing/create-thing/create-thing.component';

import { EditThingComponent } from './thing/edit-thing/edit-thing.component';

import { UserService } from './user/user.service';
import { SessionService } from './session/session.service';
import { ThingService } from './thing/thing.service';
import { LogoutComponent } from './session/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    ThingComponent,
    UserComponent,
    CreateUserComponent,
    SessionComponent,
    LoginComponent,
    CreateThingComponent,
    EditThingComponent,
    ListThingComponent,
    ThingOfTheDayComponent,
    LandingComponent,
    ShowUserComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
	HttpModule
  ],
  providers: [UserService, ThingService, SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
