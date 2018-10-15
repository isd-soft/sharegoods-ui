import { Component, OnInit } from '@angular/core';
import {Item} from "../../models/item";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../services/item-service/item.service";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item: Item = new Item();
  userId : string;

  constructor(private router: Router, private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params.userId;
    });
  }

  createItem(): void {
    this.itemService.createItem(this.userId, this.item)
      .subscribe(data => {
          console.log(data);
        },
        err => {
          console.log("Error occured to create new item");
        });
  };


}
