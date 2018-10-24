import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';
import { NavBarLink } from '@models/navbar-link';
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public navItems: Array<NavBarLink> = [

    {
      name: 'Users',
      url: '/users'
    },
    {
      name: 'Posts',
      url: '/items'
    }
  ];

  constructor(private auth : AuthService,  private router : Router) {
  }

  ngOnInit() {
  }

  logout() {
    // to write logic for logout
    this.router.navigate(['items']);
  }

}
