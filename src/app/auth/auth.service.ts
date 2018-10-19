import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Config } from 'app/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
<<<<<<< HEAD
import { User } from 'app/models/user';
=======
>>>>>>> 3470cdae7950c6422fcae279f140a30dfa5f2cb4

@Injectable()
export class AuthService {

  constructor (
    private config : Config,
    private http: HttpClient
  ) {

  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) return true; 
    return false;
  } 

  public setToken (email:string, password:string) {
    sessionStorage.setItem('token', btoa(email + ':' + password));
  }

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  public setCurrentUser (user : User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getCurrentUser(): User {
    let user : User = JSON.parse(sessionStorage.getItem('user'));
    return user;
  }

  public removeToken () {
    sessionStorage.removeItem('token');
  }

  public isLoginDataValid (email, password) {
    let url = this.config.serverUrl + '/users/login';
    let header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams().set('email', email).set('password', password);

<<<<<<< HEAD
    return this.http.post<User>(url, body, { headers: header });
=======
    return this.http.post<Boolean>(url, body, { headers: header });
>>>>>>> 3470cdae7950c6422fcae279f140a30dfa5f2cb4
  }
}