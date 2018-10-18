import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Config } from './config'

import { UserComponent } from './components/user-component/user.component';
import { ItemComponent } from './components/item-component/item.component';
import { RegisterComponent } from './components/register-component/register.component';

import { AddItemComponent } from './components/add-item-component/add-item.component';
import { FormsModule } from "@angular/forms";
import {ImageUploadModule} from "angular2-image-upload";

import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './components/login-component/login.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ItemComponent,
    RegisterComponent,
    AddItemComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ImageUploadModule.forRoot(),
    FormsModule
  ],
  providers: [
    Config,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
