import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Config } from './config'

import { UserComponent } from './components/user-component/user.component';
import { ItemComponent } from './components/item-component/item.component';
<<<<<<< HEAD
<<<<<<< HEAD
import { RegisterComponent } from './components/register-component/register.component';

import { HttpClientModule } from "@angular/common/http";
import { AddItemComponent } from './components/add-item-component/add-item.component';
import { FormsModule } from "@angular/forms";
import {ImageUploadModule} from "angular2-image-upload";


=======
import { LoginComponent } from './components/login-component/login.component';

import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
>>>>>>> Updates to login component and authorization logic
=======
import { LoginComponent } from './components/login-component/login.component';

import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
>>>>>>> Updates to login component and authorization logic

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ItemComponent,
<<<<<<< HEAD
<<<<<<< HEAD
    RegisterComponent,
    AddItemComponent
=======
    LoginComponent
>>>>>>> Updates to login component and authorization logic
=======
    LoginComponent
>>>>>>> Updates to login component and authorization logic
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
<<<<<<< HEAD
<<<<<<< HEAD
    ImageUploadModule.forRoot(),
=======
=======
>>>>>>> Updates to login component and authorization logic
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
<<<<<<< HEAD
>>>>>>> Updates to login component and authorization logic
=======
>>>>>>> Updates to login component and authorization logic
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
