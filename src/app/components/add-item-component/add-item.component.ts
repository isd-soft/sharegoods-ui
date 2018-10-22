import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageUploadComponent } from 'angular2-image-upload';
import { AuthService } from 'app/auth/auth.service';
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

  constructor(
    private router: Router, 
    private itemService: ItemService, 
    private route: ActivatedRoute, 
    private sanitizer: DomSanitizer,
    private auth : AuthService) {
      if(!auth.isAuthenticated()) {
        router.navigate(['items']);
    }
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
          this.itemCreated = true;
          this.itemId = data['id'];
          this.router.navigate(['/items', this.itemId]);
        },
        err => {
          console.log('Error occured to create new item');
        });
  }
}
