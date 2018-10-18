import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080';

  public getUsers() {
    return this.http.get<User[]>(this.apiUrl + '/users');
  }

  public createUser(user) {
    return this.http.post<User>(this.apiUrl + '/users', user);
  }
}
