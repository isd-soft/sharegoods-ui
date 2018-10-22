import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from 'app/auth/auth.service';
import { User } from 'app/models/user';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private model : any = {};
  private authFailed : boolean = false;
  private authSuccess : boolean = false;
  private registerSuccess : boolean = false;

  constructor(
    private router : Router,
    private auth : AuthService,
    private route : ActivatedRoute
    ) {
      if(auth.isAuthenticated()) {
        router.navigate(['items']);
      }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['newuser']) {
        this.registerSuccess = true;            
      }
    });
  }

  login() {

    this.auth.isLoginDataValid(this.model.email, this.model.password)
      .subscribe(user => {
          this.auth.setCurrentUser(user);
          this.auth.setToken(this.model.email,  this.model.password);
          
          this.authFailed = false;
          this.authSuccess = true;
          
          this.router.navigate(['items']);
      },
      err => {
        if(err.status = 404) {
          this.authFailed = true;
        }
        else {
          alert("Some error occured: " + err.error);
        }
      });
  }
}
