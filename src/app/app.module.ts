import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ImageUploadModule } from 'angular2-image-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Config } from './config'

import { UserComponent } from '@components/user-list-component/user.component';
import { ItemComponent } from '@components/item-list-component/item.component';
import { RegisterComponent } from '@components/register-component/register.component';
import { AddItemComponent } from '@components/add-item-component/add-item.component';
import { HomePageComponent } from '@components/home-page-component/home-page.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { HeaderComponent } from '@core/components/header/header.component';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { NavComponent } from '@core/components/nav/nav.component';
import { ItemDetailsComponent } from "./components/item-details-component/item-details.component";
import { LightboxModule } from "ngx-lightbox";
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './components/login-component/login.component';

import { NgChatModule } from 'ng-chat';
import { ChatComponent } from './components/chat-component/chat.component';
import { ChatService } from './services/chat-service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ItemComponent,
    RegisterComponent,
    AddItemComponent,
    ItemDetailsComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    NavComponent,
    HomePageComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ImageUploadModule.forRoot(),
    LightboxModule,
    FormsModule,
    NgChatModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    NavComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ChatService,
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
export class AppModule {
}