import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from '@components/user-list-component/user.component';
import { ItemComponent } from '@components/item-list-component/item.component';
import { RegisterComponent } from '@components/register-component/register.component';
import { LoginComponent } from '@components/login-component/login.component';
import { ItemDetailsComponent } from '@components/item-details-component/item-details.component';
import { DefaultErrorComponent } from '@components/default-error-component/default-error.component';
import { EditItemComponent } from "@components/edit-item-component/edit-item.component";
import { ProfileComponent } from "@components/profile-component/profile.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'users/:id/items',
    component: ItemComponent
  },
  {
    path: 'users/:id/profile',
    component: ProfileComponent
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
    path: 'items',
    component: ItemComponent
  },
  {
    path: 'items/:itemId',
    component: ItemDetailsComponent
  },
  {
    path: 'items/:itemId/edit',
    component: EditItemComponent
  },
  {
    path: 'error',
    component: DefaultErrorComponent
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
