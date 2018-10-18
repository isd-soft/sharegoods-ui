import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserComponent } from './components/user-list-component/user.component';
import { ItemComponent } from './components/item-list-component/item.component';
import { RegisterComponent } from './components/register-component/register.component';

import { HttpClientModule } from "@angular/common/http";
import { AddItemComponent } from './components/add-item-component/add-item.component';
import { FormsModule } from "@angular/forms";
import {ImageUploadModule} from "angular2-image-upload";
import { ItemDetailsComponent } from './components/item-details-component/item-details.component';
import {LightboxModule} from "ngx-lightbox";


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ItemComponent,
    RegisterComponent,
    AddItemComponent,
    ItemDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ImageUploadModule.forRoot(),
    LightboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
