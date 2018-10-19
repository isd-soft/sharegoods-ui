import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageUploadComponent } from 'angular2-image-upload';

import { Item } from '@models/item';
import { ItemService } from '@services/item-service/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  @ViewChild(ImageUploadComponent) imageUploadComponent;

  item: Item = new Item();
  userId: string;
  formData: FormData = new FormData();
  uploadedImages: any;
  itemCreated = false;
  itemId: Number;

  // for testing(to be removed after get-item-list-component exists)
  itemDetails: any;
  itemDto: Item = new Item();
  imagesSrc = [];

  constructor(private router: Router, private itemService: ItemService, private route: ActivatedRoute, private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params.userId;
    });
  }

  createItem(): void {
    this.uploadedImages = this.imageUploadComponent.files;
    this.formData.append('title', this.item.title);
    this.formData.append('description', this.item.description);
    for (let i = 0; i < this.uploadedImages.length; i++) {
      this.formData.append('file', this.uploadedImages[i].file);
    }

    this.itemService.createItem(this.userId, this.formData)
      .subscribe(data => {
          console.log(data);
          alert('Item was created');
          this.itemCreated = true;
          this.itemId = data['id'];

          // testing(to be removed after get-item-list-component exists, redirect to getItemComponent )
          this.itemService.getItem(this.itemId)
            .subscribe(data => {
              this.itemDetails = data;
              this.itemDto = this.itemDetails.itemDto;
              const imageDtoList = this.itemDetails.imageDtoList;
              for (let i = 0; i < imageDtoList.length; i++) {
                const imageSrc = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + imageDtoList[i].imageBase64);
                this.imagesSrc.push(imageSrc);
              }
            });
        },
        err => {
          console.log('Error occured to create new item');
        });
  }
}
