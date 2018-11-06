import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/user';
import { UserService } from '@services/user-service/user.service';
import { AuthService } from 'app/auth/auth.service';
import { DefaultErrorService } from '@services/default-error.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  lastUserDeleted;
  showAlreadyDeleted;
  showSuccessfullyDeleted;

  constructor(private router: Router,
              private userService: UserService,
              private auth: AuthService,
              private errorService : DefaultErrorService) {
  }

  ngOnInit() {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['items']);
    }
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => { this.users = data; },
      error => {
        console.error("Some error has occured. Full error below:");
        console.error(error);
        /* Front error handling */ }
      );
  }

  clearAlerts() {
    this.showAlreadyDeleted = false;
    this.showSuccessfullyDeleted = false;
    this.lastUserDeleted = "";
  }

  deleteUser(idToDelete) {

    this.clearAlerts();

    for(let i = 0; i < this.users.length; i++) {
      if (this.users[i] == idToDelete) {
        this.lastUserDeleted = this.users[i].firstName + ' ' + this.users[i].lastName;
      }
    }

    this.userService.deleteUser(idToDelete).subscribe(
      data => {
        this.showSuccessfullyDeleted = true;
        this.getUsers();
      },
      error => {
        if(error.status == 404) {
          console.error("Got 404. User is already deleted. Refreshing user list.")
          this.showAlreadyDeleted = true;
          this.getUsers();
        } else {

          console.error("Some error has occured during deletion. Error code: " + error.status + ". Full error below:");
          console.error(error);
          this.errorService.displayErrorPage(error);
        }
      });
  }


}
