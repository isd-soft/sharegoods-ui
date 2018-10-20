import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Item } from '@models/item';
import { ItemService } from '@services/item-service/item.service';
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: any;
  itemsDto: any = new Array();


  constructor(private router: Router, private itemService: ItemService, private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.itemService.getItems()
      .subscribe(data => {
        console.log("data:", data);
        this.items = data;
        for(let i = 0; i < this.items.length; i++) {
          let imageSrc = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,'+ this.items[i].thumbnailDto.imageBase64);
          this.itemsDto.push({itemId: this.items[i].itemId, title: this.items[i].title, src: imageSrc });
        }
      });
  }
}

