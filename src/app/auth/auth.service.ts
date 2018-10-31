import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from 'app/models/user';
import { environment } from '@env/environment';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  data = new BehaviorSubject<any[]>([]);
  array = new Array();

  public addToSessionStorage(key, value) {
    sessionStorage.setItem(key, value);
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
    let result: boolean;
    result = this.getCurrentUser().role == 'ADMIN';
    return result;
  }

  public setToken(email: string, password: string) {
    this.addToSessionStorage('token', btoa(email + ':' + password));
  }

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  public removeToken() {
    sessionStorage.removeItem('token');
  }

  public setCurrentUser(user: User) {
    this.addToSessionStorage('user', JSON.stringify(user));
  }

  public getCurrentUser(): User {
    const user: User = JSON.parse(sessionStorage.getItem('user'));
    return user;
  }

  public removeUser() {
    sessionStorage.removeItem('user');
  }

  public isLoginDataValid(email, password) {
    const url = environment.apiUrl + '/users/login';
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams().set('email', email).set('password', password);

    return this.http.post<User>(url, body, {headers: header});
  }
}
