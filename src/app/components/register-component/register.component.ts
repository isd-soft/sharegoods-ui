import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@models/user';
import { UserService } from '@services/user-service/user.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  private emailNotUnique = false;

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
          if (err.status == 409) {
            this.emailNotUnique = true;
          } else {
            alert('Some error occured: ' + err.status);
          }
        });
  }
}
