import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from '@components/user-list-component/user.component';
import { ItemComponent } from '@components/item-list-component/item.component';
import { AddItemComponent } from '@components/add-item-component/add-item.component';
import { RegisterComponent } from '@components/register-component/register.component';
import { LoginComponent } from './components/login-component/login.component';
import { HomePageComponent } from '@components/home-page-component/home-page.component';
import { ItemDetailsComponent } from "./components/item-details-component/item-details.component";


const routes: Routes = [
   {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full',
  },
  {
    path: 'items',
    component: ItemComponent
  },
  {
    path: 'users/:userId/additem',
    component: AddItemComponent
  },
  { 
    path: 'login',
    component: LoginComponent 
  },
  { 
    path: 'login/:newuser',
    component: LoginComponent 
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { 
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'items/:itemId',
    component: ItemDetailsComponent
  },
  {
    path: '**', 
    redirectTo: 'items'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
