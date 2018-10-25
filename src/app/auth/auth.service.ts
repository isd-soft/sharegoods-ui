import { Injectable, OnInit } from '@angular/core';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { Config } from 'app/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from 'app/models/user';

@Injectable()
export class AuthService {

  constructor (
    private config : Config,
    private http: HttpClient
  ) {  }

  data = new BehaviorSubject<any[]>([]);
  array = new Array();

  public addToSessionStorage(key,value) {
    sessionStorage.setItem(key,value);
    this.array[key] = value;
    this.data.next(this.array);
  }

  public isAuthenticatedObservable () {
    return this.data;
  } 

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) return true; 
    return false;
  } 

  public setToken (email:string, password:string) {
    this.addToSessionStorage('token', btoa(email + ':' + password));
  }

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  public removeToken () {
    sessionStorage.removeItem('token');
  }

  public setCurrentUser (user : User) {
    this.addToSessionStorage('user', JSON.stringify(user));
  }

  public getCurrentUser(): User {
    let user : User = JSON.parse(sessionStorage.getItem('user'));
    return user;
  }

  
  public isLoginDataValid (email, password) {
    let url = this.config.serverUrl + '/users/login';
    let header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams().set('email', email).set('password', password);

    return this.http.post<User>(url, body, { headers: header });
  }
}