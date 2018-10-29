import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  public createUser(user) {
    return this.http.post<User>(environment.apiUrl + '/users', user);
  }

}
