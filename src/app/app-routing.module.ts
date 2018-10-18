import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserComponent} from './components/user-component/user.component';
import {ItemComponent} from './components/item-component/item.component';
import {LoginComponent} from './components/login-component/login.component';


const routes: Routes = [
   {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'items',
    component: ItemComponent
  },
  { 
    path: 'login',
    component: LoginComponent 
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
