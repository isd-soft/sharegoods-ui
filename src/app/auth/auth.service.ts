import { Injectable, OnInit } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Config } from 'app/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from 'app/models/user';

@Injectable()
export class AuthService implements OnInit {

  constructor (
    private config : Config,
    private http: HttpClient
  ) {  }

  ngOnInit() {
  }

  //public sessionStorageItems = new Array;

  // ALSO need to add for removing from array
  // AND in token and user getters request from list not from sessionstorage directly

/*   public addToSessionStorage(key : string, value : string) {
    
    sessionStorage.setItem(key.toString(),value);
    console.log("Session storage: ");
    console.log(sessionStorage);

    this.sessionStorageItems[key] = value;
    console.log("Session Storage Items Updated: Key " + key + " Value " + value);
    console.log(this.sessionStorageItems);
  } */

  public isAuthenticatedObservable () {
    return Observable.of(sessionStorage);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) return true; 
    return false;
  } 

  public setToken (email:string, password:string) {
    sessionStorage.setItem('token', btoa(email + ':' + password));
    console.log(sessionStorage);
  }

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  public removeToken () {
    sessionStorage.removeItem('token');
  }



  public setCurrentUser (user : User) {
    sessionStorage.setItem('user', JSON.stringify(user));
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