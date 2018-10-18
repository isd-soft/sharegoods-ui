import { Component, OnInit } from '@angular/core';
import {LoginService} from 'app/services/login-service/login.service';
import {Router} from '@angular/router'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(
    private loginService :LoginService,
    private router : Router) {
  }

  ngOnInit() {
  }

  login () {
    let result : boolean = this.loginService.login(this.model.email, this.model.password);
    if (result) {
      this.router.navigate(['items']);    
    }
  }
}
