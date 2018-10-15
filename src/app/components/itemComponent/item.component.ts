import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Item } from '../../models/item';
import { ItemService } from '../../services/itemService/item.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Item[];
  constructor(private router: Router, private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems()
      .subscribe( data => {
        this.items = data;
      });
  }

}
