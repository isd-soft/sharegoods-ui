import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageUploadComponent } from 'angular2-image-upload';

import { AuthService } from '@auth/auth.service';
import { Item } from '@models/item';
import { ItemService } from '@services/item-service/item.service';
import { FileHolder } from "angular2-image-upload/src/image-upload/image-upload.component";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, OnDestroy {
  @ViewChild(ImageUploadComponent) imageUploadComponent;
  navigationSubscription;
  item: Item = new Item();
  formData: FormData = new FormData();
  uploadedImages: any;
  itemCreated = false;
  itemId: Number;

  constructor(private router: Router,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private auth: AuthService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.reloadComponent();
      }
    });

    if (auth.isAuthenticated()) {
      return;
    }
    router.navigate(['items']);
  }

  ngOnInit() {
  }

  createItem(): void {
    this.uploadedImages = this.imageUploadComponent.files;
    this.formData.append('title', this.item.title);
    this.formData.append('description', this.item.description);
    for (let i = 0; i < this.uploadedImages.length; i++) {
      this.formData.append('file', this.uploadedImages[i].file);
    }

    this.itemService.createItem(this.auth.getCurrentUser().id, this.formData)
      .subscribe(data => {
          this.itemCreated = true;
          this.itemId = data['id'];
          this.router.navigate(['/items', this.itemId]);
        },
        err => {
          console.log('Error occurred to create new item');
        });
  }

  reloadComponent() {
    this.item = new Item();
    this.imageUploadComponent.files = [];
    this.imageUploadComponent.fileCounter = 0;
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
