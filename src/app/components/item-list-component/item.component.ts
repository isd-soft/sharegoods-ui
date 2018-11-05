import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService } from 'app/auth/auth.service';
import { ItemService } from '@services/item-service/item.service';
import { SearchService } from "@services/search-service/search.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: any;
  itemsDto: any = [];
  ratingOrder = 'Desc';
  dateOrder = 'Asc';
  titleOrder = 'Desc';
  userId;
  searchTitle: string;
  foundItems = true;

  // for button arrows
  sortingOptions = {value: 'Rating', direction: 'Desc'};

  constructor(private router: Router,
              private route: ActivatedRoute,
              private itemService: ItemService,
              private _sanitizer: DomSanitizer,
              private auth: AuthService,
              private search: SearchService) {
  }


  ngOnInit() {
      // Initial values
      //this.search.changeMessage('');
      this.setSortingOptions('Rating','Desc');

      // Get User Id From URL For Items By Specific User
      this.route.params.subscribe(params => {
          if (params['id'] != undefined) {
            this.userId = +params['id'];
          } else {
            this.userId = undefined;
          }

      });

      // Subscribe to changes in search input and query server on change
      this.search.currentMessage.subscribe(message => {
        this.searchTitle = message;
        this.getItems();
      });
  }

  getUserIdIfAuth() {
    if (this.auth.isAuthenticated()) {
      return this.auth.getCurrentUser().id;
    }
  }

  sort(value, direction) {
    this.setSortingOptions(value, direction);
    this.getItems();
  }

  setSortingOptions(value, direction) {
    this.sortingOptions = {value: value, direction: direction};
  }

  getItems() {
    let service;
    if (this.userId != undefined) { // typeof - it will check undefined, null, 0 and "" also
      service = this.itemService.getItemsByUser(this.userId, this.sortingOptions.value, this.sortingOptions.direction, this.searchTitle);
    } else {
      service = this.itemService.getItems(this.sortingOptions.value, this.sortingOptions.direction, this.searchTitle);
    }
    this.subscribeToItems(service);
  }

  subscribeToItems(service) {
    service.subscribe(data => {
      this.itemsDto = [];
      this.foundItems = true;
      this.items = data;
      for (let i = 0; i < this.items.length; i++) {
        const imageSrc = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + this.items[i].thumbnailDto.imageBase64);
        this.itemsDto.push({itemId: this.items[i].itemId, title: this.items[i].title, src: imageSrc, rating: this.items[i].rating});
      }
    },
    err => {
      console.log("Error occured");
      this.foundItems = false;
    });
  }
}

