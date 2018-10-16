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
  fileList: FileList;
  uploadedImages: File[] = [];
  formData: FormData = new FormData();

  constructor(private router: Router, private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params.userId;
    });
  }

  onFileChange(event) {
    this.uploadedImages = [];
    if (event.target.files.length === 0) {
      return;
    }
    this.fileList = event.target.files;
    for (let i = 0; i < this.fileList.length; i++) {
      const file = this.fileList[i];
      if (!file.type.match('image')) {
        continue;
      }
      this.uploadedImages.push(file);
    }
  }

  createItem(): void {
    this.formData.append('title', this.item.title);
    this.formData.append('description', this.item.description);
    for (let i = 0; i < this.uploadedImages.length; i++) {
      this.formData.append('file', this.uploadedImages[i]);
    }

    this.itemService.createItem(this.userId, this.formData)
      .subscribe(data => {
          console.log(data);
        },
        err => {
          console.log("Error occured to create new item");
        });
  };


}
