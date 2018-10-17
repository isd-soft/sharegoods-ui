import {Component, OnInit, ViewChild} from '@angular/core';
import {Item} from "../../models/item";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../services/item-service/item.service";
import {ImageUploadComponent} from "angular2-image-upload";
import {FileHolder} from "angular2-image-upload/src/image-upload/image-upload.component";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  @ViewChild(ImageUploadComponent) imageUploadComponent;

  item: Item = new Item();
  userId : string;
  formData: FormData = new FormData();
  uploadedImages: FileHolder[] = [];

  // fileList: FileList;
  // uploadedImages: File[] = [];
  // urls = new Array<string>();
  itemCreated: boolean = false;

  constructor(private router: Router, private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params.userId;
    });
  }

  // onFileChange(event) {
  //   this.uploadedImages = [];
  //   this.urls = [];
  //   if (event.target.files.length === 0) {
  //     return;
  //   }
  //   this.fileList = event.target.files;
  //   for (let i = 0; i < this.fileList.length; i++) {
  //     let reader = new FileReader();
  //     const file = this.fileList[i];
  //     reader.onload = (e: any) => {
  //       this.urls.push(e.target.result);
  //     };
  //     if (!file.type.match('image')) {
  //       continue;
  //     }
  //     reader.readAsDataURL(file);
  //     this.uploadedImages.push(file);
  //   }
  // }

  createItem(): void {
    this.formData.append('title', this.item.title);
    this.formData.append('description', this.item.description);
    this.uploadedImages = this.imageUploadComponent.files;
    console.log("Uploaded images", this.uploadedImages);
    for(let i= 0; i < this.uploadedImages.length; i++){
      this.formData.append('file', this.uploadedImages[i].file);
    }
    console.log("Form data:", this.formData);
    this.itemService.createItem(this.userId, this.formData)
      .subscribe(data => {
          console.log(data);
          this.itemCreated = true;
        },
        err => {
          console.log("Error occured to create new item");
        });
  };


}
