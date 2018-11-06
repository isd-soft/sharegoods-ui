import { NavigationStart, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '@auth/auth.service';
import { NavBarLink } from '@models/navbar-link';
import { SearchService } from '@services/search-service/search.service';
import { ChatComponent } from '@components/chat-component/chat.component';
import 'rxjs-compat/add/operator/filter';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  searchTitle: string = '';

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
    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        if (!(event.url.match(/\/users\/\d+\/items/) || event.url == '/items')) {
          this.search.changeMessage('');
        }
      });
  }

  logout() {
    this.auth.removeToken();
    this.auth.removeUser();
    this.chatComponent.userId = null;

    this.router.navigate(['items']);

  }

  findItems() {
    this.search.changeMessage(this.searchTitle);

    // if on any other page than user's items
    if (!this.router.url.match(/\/users\/\d+\/items/)) {
      console.log("on any other page");
      this.router.navigate(['items']);
    } else {
      console.log("on users/id/items");
    }
  }

  searchTitleChange() {
    if (this.searchTitle == '') {
      this.search.changeMessage(this.searchTitle);
    }
  }

}
