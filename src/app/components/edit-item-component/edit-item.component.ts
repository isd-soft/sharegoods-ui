import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ImageUploadComponent } from "angular2-image-upload";
import { ItemService } from "@services/item-service/item.service";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  @ViewChild( ImageUploadComponent ) imageUploadComponent;

  itemId: Number;
  itemDto: any;
  itemDetails: any;

  images = [];

  formData: FormData = new FormData();
  uploadedImages: any;
  maxExceeded = false;

  constructor(private router: Router, private itemService: ItemService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params.itemId;
    });

    this.itemService.getItem(this.itemId)
      .subscribe(data => {
          this.itemDetails = data;
          this.itemDto = this.itemDetails.itemDto;
          let imageDtoList = this.itemDetails.imageDtoList;
          for (let i = 0; i < imageDtoList.length; i++) {
            this.images.push({fileName: imageDtoList[i].name, url: 'http://localhost:8080/items/getImage/' + imageDtoList[i].id});
          }
        },
        err => {
          if (err.status == '404') {
            this.router.navigate(['items']);
          } else {
            alert('Some error has occurred ' + err.status);
          }
        });
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
      if (this.uploadedImages[i].src[0] == 'h') {
        this.formData.append('uploadedImagesIds', this.uploadedImages[i].src.substr(37));
      } else {
        this.formData.append('file', this.uploadedImages[i].file);
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
}
