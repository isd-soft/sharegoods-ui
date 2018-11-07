import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUploadComponent } from 'angular2-image-upload';

import { ItemService } from '@services/item-service/item.service';
import { environment } from '@env/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  @ViewChild(ImageUploadComponent) imageUploadComponent;

  itemId: Number;
  itemDto: any;
  itemDetails: any;

  images = [];

  formData: FormData = new FormData();
  uploadedImages: any;
  maxExceeded = false;

  constructor(private router: Router, private itemService: ItemService, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.itemId = params.itemId;
    });

    this.itemService.getItem(this.itemId)
      .subscribe(data => {
          this.itemDetails = data;
          this.itemDto = this.itemDetails.itemDto;
          const imageDtoList = this.itemDetails.imageDtoList;
          for (let i = 0; i < imageDtoList.length; i++) {
            this.images.push({fileName: imageDtoList[i].name, url: environment.apiUrl + '/items/getImage/' + imageDtoList[i].id});
          }
          this.imageUploadComponent.fileCounter = imageDtoList.length;
        },
        err => {
          if (err.status == '404') {
            this.router.navigate(['items']);
          } else {
            alert('Some error has occurred ' + err.status);
          }
        });
    this.spinner.hide();
  }

  editItem() {
    this.maxExceeded = false;
    this.uploadedImages = this.imageUploadComponent.files;
    if (this.uploadedImages.length > 4) {
      this.maxExceeded = true;
      return;
    }
    this.formData.append('title', this.itemDto.title);
    this.formData.append('description', this.itemDto.description);
    for (let i = 0; i < this.uploadedImages.length; i++) {
      // if new image was uploaded
      if (this.uploadedImages[i].src.includes('data')) {
        this.formData.append('file', this.uploadedImages[i].file);
      } else {
        // image already in database, get id
        const url = this.uploadedImages[i].src;
        this.formData.append('uploadedImagesIds', url.substring(url.lastIndexOf('/') + 1));
      }
    }

    this.itemService.updateItem(this.itemId, this.formData)
      .subscribe(data => {
          this.router.navigate(['/items', this.itemId]);
        },
        err => {
          console.log('Error occurred to edit the item');
        });
  }

  cancelButtonPressed() {
    this.router.navigate(['items/' + this.itemId]);
  }
}

