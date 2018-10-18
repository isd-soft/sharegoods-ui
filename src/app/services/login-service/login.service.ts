import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Config} from 'app/config';
import {AuthService} from 'app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private config : Config,
        private auth : AuthService) {
    }

    private r : boolean;

    login(email : string, password : string):boolean {

        let url = this.config.serverUrl + '/users/login';
        let header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        let body = new HttpParams().set('email', email).set('password', password);
    
        let result = this.http.post<Observable<boolean>>(url, body, { headers: header })
          .subscribe(isValid => {
            if (isValid) {
              this.auth.setToken(email, password);
              this.r = true;
            } else {
              this.r = false;
            }
          });
          return this.r;
    }
}