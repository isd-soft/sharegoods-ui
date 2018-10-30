import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  searchTitle: string;
  foundItems = true;

  // for button arrows
  sortingOptions = {value: 'Rating', direction: 'Desc'};

  constructor(private router: Router,
              private itemService: ItemService,
              private _sanitizer: DomSanitizer,
              private auth: AuthService,
              private search: SearchService) {
  }

  getUserIdIfAuth() {
    if (this.auth.isAuthenticated()) {
      return this.auth.getCurrentUser().id;
    }
  }

  ngOnInit() {
    this.search.changeMessage('');
    this.search.currentMessage.subscribe(message => {
      this.searchTitle = message;
      this.findByTitle('Rating', 'Desc');
    });
  }

  getItems(value, direction) {
    this.itemService.getSortedItems(value, direction)
      .subscribe(data => {
        this.itemsDto = [];
        this.foundItems = true;
        this.items = data;
        for (let i = 0; i < this.items.length; i++) {
          const imageSrc = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + this.items[i].thumbnailDto.imageBase64);
          this.itemsDto.push({
            itemId: this.items[i].itemId,
            title: this.items[i].title,
            src: imageSrc,
            rating: this.items[i].rating
          });
        }
        console.log("should be updated", this.itemsDto);
      });
  }

  sort(value, direction) {
    if (this.searchTitle) {
      this.findByTitle(value, direction);
    } else {
      this.sortingOptions = {value: value, direction: direction};
      this.getItems(value, direction);
    }
  }

  findByTitle(value, direction) {
    if (this.searchTitle == '') {
      this.sort('Rating', 'Desc');
    } else {
      this.sortingOptions = {value: value, direction: direction};
      this.itemsDto = [];
      this.itemService.getItemsByTitle(this.searchTitle, value, direction)
        .subscribe(data => {
            this.items = data;
            this.foundItems = true;
            for (let i = 0; i < this.items.length; i++) {
              const imageSrc = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + this.items[i].thumbnailDto.imageBase64);
              this.itemsDto.push({
                itemId: this.items[i].itemId,
                title: this.items[i].title,
                src: imageSrc,
                rating: this.items[i].rating
              });
            }
          },
          err => {
            console.log("Error occured");
            this.foundItems = false;
          });
    }
  }

}

