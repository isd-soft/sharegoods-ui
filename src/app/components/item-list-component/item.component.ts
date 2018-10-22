import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';

import { Item } from '@models/item';
import { ItemService } from '@services/item-service/item.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Item[];

  constructor(private router: Router, private itemService: ItemService, private auth : AuthService) {

  }

  getUserIdIfAuth()
  {
    if(this.auth.isAuthenticated())
    {
      return this.auth.getCurrentUser().id;
    }
  }


  ngOnInit() {
    this.itemService.getItems()
      .subscribe(data => {
        this.items = data;
        for (let i = 0; i < this.items.length; i++) {
          let description = this.items[i].description;
          if (description.length > 50) {
            this.items[i].description = description.substr(0, 50) + '...';
          }
        }
        console.log(data);
      });
  }

}
