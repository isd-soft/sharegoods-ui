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
  updateClicked = false;
  userId: Number;
  private emailNotUnique = false;

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
    this.userService.getUser(this.auth.getCurrentUser().id)
      .subscribe(data => {
        this.user = data;
        },error => {
        console.error("Some error has occured. Full error below:");
        console.error(error);
      });
  }

  updateUser() {
    this.userService.updateUser(this.userId, this.user)
      .subscribe(data => {
          this.auth.removeToken();
          this.router.navigate(['login']);
        },
        err => {
          if (err.status == '409') {
            this.emailNotUnique = true;
            this.user.password = '';
          } else {
            alert('Some error occured: ' + err.status);
          }
        });
  }

}
