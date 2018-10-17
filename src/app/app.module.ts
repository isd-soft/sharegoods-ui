import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserComponent } from './components/user-component/user.component';
import { ItemComponent } from './components/item-component/item.component';
import { RegisterComponent } from './components/register-component/register.component';

import { HttpClientModule } from "@angular/common/http";
import { AddItemComponent } from './components/add-item-component/add-item.component';
import { FormsModule } from "@angular/forms";
import {ImageUploadModule} from "angular2-image-upload";



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ItemComponent,
    RegisterComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ImageUploadModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
