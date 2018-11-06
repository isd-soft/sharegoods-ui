import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '@env/environment';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUsers() {
    return this.http.get<User[]>(environment.apiUrl + '/users');
  }

  public getUser(id) {
    return this.http.get<User>(environment.apiUrl + `/users/${id}`);
  }

  public createUser(user) {
    return this.http.post<User>(environment.apiUrl + '/users', user);
  }

  public updateUser(id, user) {
    return this.http.put<User>(environment.apiUrl + `/users/${id}`, user);
  }

  public updatePassword(id, oldPassword, newPassword) {
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams().set('oldPassword', oldPassword).set('newPassword', newPassword);
    return this.http.put(environment.apiUrl + `/users/${id}/updatepassword`, body, {headers: header, responseType: 'text'});
  }

  public deleteUser(id) {
    return this.http.delete(environment.apiUrl + '/users/' + id, {responseType: 'text'});
  }

}
