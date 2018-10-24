import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from 'app/models/user';
import { environment } from '@env/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  public setToken(email: string, password: string) {
    sessionStorage.setItem('token', btoa(email + ':' + password));
  }

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  public setCurrentUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getCurrentUser(): User {
    const user: User = JSON.parse(sessionStorage.getItem('user'));
    return user;
  }

  public removeToken() {
    sessionStorage.removeItem('token');
  }

  public removeUser () {
    sessionStorage.removeItem('user');
  }

  public isLoginDataValid(email, password) {
    const url = environment.apiUrl + '/users/login';
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams().set('email', email).set('password', password);

    return this.http.post<User>(url, body, {headers: header});
  }
}
