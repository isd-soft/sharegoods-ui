import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models/user';
import { UserService } from '@services/user-service/user.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];

  constructor(private router: Router, 
              private userService: UserService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.redirectIfNotLoggedIn('items');
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => { this.users = data; },
      error => { /* Error handling */ }
      );
  }

  deleteUser(idToDelete) {
    this.userService.deleteUser(idToDelete).subscribe(
      data => { 
        console.error("User successfully deleted"); 
      }, 
      error => { 
        console.error("Some error has occured. Error code: " + error.code); 
        console.error(error); 
      }
      );
  }


}
