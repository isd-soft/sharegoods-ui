import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "@services/user-service/user.service";
import { AuthService } from "@auth/auth.service";
import { User } from "@models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  userId: Number;
  private emailNotUnique = false;
  profileHasNotChanged: boolean;

  oldPassword = '';
  newPassword = '';
  newPasswordConfirm = '';

  showSuccessfullyUpdated = false;
  showProfileHasNotChanged = false;

  showPasswordSuccessfullyUpdated = false;
  showOldPasswordIncorrect = false;
  showPasswordsDontMatch = false;
  showNewPasswordInvalid = false;


  constructor(private router: Router,
              private userService: UserService,
              private auth: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.auth.redirectIfNotLoggedIn('items');
    this.route.params.subscribe(params => {
      this.userId = params.id;
    });
    if (this.auth.getCurrentUser().id != this.userId) {
      this.router.navigate(['items']);
    }
    this.getUser();
  }

  getUser() {
    this.showSuccessfullyUpdated = false;
    this.showProfileHasNotChanged = false;
    this.userService.getUser(this.auth.getCurrentUser().id)
      .subscribe(data => {
        this.user = data;
        },error => {
        console.error("Some error has occured:", error);
      });
  }

  updateUser() {
    console.log("profile has changed", this.profileHasNotChanged);
    this.userService.updateUser(this.userId, this.user)
      .subscribe(data => {
          if (this.profileHasNotChanged) {
            this.showProfileHasNotChanged = true;
            setTimeout(() => {
              this.showProfileHasNotChanged = false;
            }, 2000);
          } else {
            this.showSuccessfullyUpdated = true;
            setTimeout(() => {
              this.getUser();
            }, 2000);
          }},
        err => {
          if (err.status == '409') {
            this.emailNotUnique = true;
          } else {
            alert('Some error occured: ' + err.status);
          }
        });
  }

  updatePassword() {
    if (this.newPassword != this.newPasswordConfirm) {
      this.showPasswordsDontMatch = true;
      return;
    }
    this.showPasswordsDontMatch = false;
    this.showOldPasswordIncorrect = false;
    this.userService.updatePassword(this.userId, this.oldPassword, this.newPassword)
      .subscribe(data => {
          this.showPasswordSuccessfullyUpdated = true;
          setTimeout(() => {
            this.auth.removeToken();
            this.router.navigate(['login']);
          }, 1500);
        },
        err => {
          if (err.status == '404') {
            this.showOldPasswordIncorrect = true;
          } else if  (err.status == '400') {
            this.showNewPasswordInvalid = true;
          } else {
            alert('Some error occured: ' + err.status);
          }
        });
  }

  clearPasswords() {
    this.showOldPasswordIncorrect = false;
    this.showPasswordsDontMatch = false;
    this.showNewPasswordInvalid = false;
    this.oldPassword = '';
    this.newPassword = '';
    this.newPasswordConfirm = '';
  }

}
