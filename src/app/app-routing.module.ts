import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from '@components/user-list-component/user.component';
import { ItemComponent } from '@components/item-list-component/item.component';
import { AddItemComponent } from '@components/add-item-component/add-item.component';
import { RegisterComponent } from '@components/register-component/register.component';
import { HomePageComponent } from '@components/home-page-component/home-page.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent
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
    path: 'users/:userId/additem',
    component: AddItemComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

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
