import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '@auth/auth.service';
import { NavBarLink } from '@models/navbar-link';
import { SearchService } from '@services/search-service/search.service';
import { ChatComponent } from 'app/components/chat-component/chat.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  searchTitle: string;

  public navItems: Array<NavBarLink> = [
    {
      name: 'Posts',
      url: '/items'
    }
  ];

  constructor(private auth: AuthService,
              private router: Router,
              private search: SearchService,
              private chatComponent: ChatComponent) {
  }

  ngOnInit() {
    this.search.currentMessage.subscribe(message => this.searchTitle = message);
  }

  logout() {
    this.auth.removeToken();
    this.auth.removeUser();
    this.chatComponent.userId = null;

    window.location.reload();

    //this.router.navigate(['items']);
  }

  findItems() {
    this.search.changeMessage(this.searchTitle);
  }

  searchTitleChange() {
    if (this.searchTitle == '') {
      this.search.changeMessage(this.searchTitle);
    }
  }

}
