import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService } from 'app/auth/auth.service';
import { ItemService } from '@services/item-service/item.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: any;
  itemsDto: any = [];


  constructor(private router: Router,
              private itemService: ItemService,
              private _sanitizer: DomSanitizer,
              private auth: AuthService) {
  }

  getUserIdIfAuth() {
    if (this.auth.isAuthenticated()) {
      return this.auth.getCurrentUser().id;
    }
  }


  ngOnInit() {
    this.itemService.getItems()
      .subscribe(data => {
        this.items = data;
        for (let i = 0; i < this.items.length; i++) {
          const imageSrc = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + this.items[i].thumbnailDto.imageBase64);
          this.itemsDto.push({itemId: this.items[i].itemId, title: this.items[i].title, src: imageSrc});
        }
      });
  }

  sort(value) {
    console.log('Sorting by: ', value);
  }
}

