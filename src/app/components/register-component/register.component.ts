import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {User} from '@models/user';
import {UserService} from '@services/user-service/user.service';
import {AuthService} from 'app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  private emailNotUnique = false;
  private invalidPassword = false;
  user: User = new User();

  constructor(
    private router: Router,
    private userService: UserService,
    private auth: AuthService
  ) {
    if (auth.isAuthenticated()) {
      router.navigate(['items']);
    }
  }

  createUser(): void {
    this.userService.createUser(this.user)
      .subscribe(data => {
          this.router.navigate(['login/newuser']);
        },
        err => {
          if (err.status == '409') {
            this.emailNotUnique = true;
          } else if (err.status == '400') {
            this.invalidPassword = true;
          } else {
            alert('Some error occured: ' + err.status);
          }
        });
  }

  validatePassword() {
    let myPassword = this.user.password;

    if ((/[a-z]/.test(myPassword)) && (/[A-Z]/.test(myPassword)) && (/[0-9]/.test(myPassword))) {
      console.log('good!');
      return true;
    } else {
      console.error('bad');
      return false;
    }
  }
}
