import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

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

  public removeToken () {
    sessionStorage.removeItem('token');
  }

}