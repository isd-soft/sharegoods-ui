import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserComponent } from './components/user-component/user.component';
import { ItemComponent } from './components/item-component/item.component';
import { RegisterComponent } from './components/register-component/register.component';

import {HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user-service/user.service';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ItemComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
