import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { User } from '@models/user';
import { environment } from '@env/environment';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  data = new BehaviorSubject<any[]>([]);
  array = [];

  public addToLocalStorage(key, value) {
    localStorage.setItem(key, value);
    this.array[key] = value;
    this.data.next(this.array);
  }

  public isAuthenticatedObservable() {
    return this.data;
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  public isAdmin(): boolean {
    if (this.isAuthenticated()) {
      return this.getCurrentUser().role == 'ADMIN';
    } else {
      return false;
    }
  }

  public redirectIfNotLoggedIn(redirectToComponent: string) {
    if (!this.isAuthenticated()) {
      this.router.navigate([redirectToComponent]);
    }
  }

  public setToken(email: string, password: string) {
    this.addToLocalStorage('token', btoa(email + ':' + password));
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public removeToken() {
    localStorage.removeItem('token');
  }

  public setCurrentUser(user: User) {
    this.addToLocalStorage('user', JSON.stringify(user));
  }

  public getCurrentUser(): User {
    const user: User = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  public removeUser() {
    localStorage.removeItem('user');
  }

  public isLoginDataValid(email, password) {
    const url = environment.apiUrl + '/users/login';
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams().set('email', email).set('password', password);

    return this.http.post<User>(url, body, {headers: header});
  }
}
