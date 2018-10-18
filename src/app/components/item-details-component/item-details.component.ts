import { Component, OnInit } from '@angular/core';
import {Item} from "../../models/item";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../services/item-service/item.service";
import {DomSanitizer} from "@angular/platform-browser";
import {IAlbum, IEvent, Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent} from "ngx-lightbox";
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  public albums: Array<IAlbum>;
  private _subscription: Subscription;
  itemId: Number;
  itemDetails: any;
  itemDto: Item = new Item();
  imagesSrc = new Array();

  constructor(private router: Router, private itemService: ItemService, private route: ActivatedRoute, private _sanitizer: DomSanitizer,
              private _lightbox: Lightbox, private _lightboxEvent: LightboxEvent, private _lighboxConfig: LightboxConfig) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params.itemId;
    });

    this.albums = [];
    for (let i = 1; i <= 4; i++) {
      const src = 'assets/img/image' + i + '.jpg';
      const thumb = 'assets/img/image' + i + '-thumb.jpg';
      const album = {
        src: src,
        thumb: thumb
      };
      this.albums.push(album);
    }

    // set default config
    this._lighboxConfig.fadeDuration = 1;
    this.itemService.getItem(this.itemId)
      .subscribe( data => {
        this.itemDetails = data;
        this.itemDto = this.itemDetails.itemDto;
        let imageDtoList = this.itemDetails.imageDtoList;
        for(let i = 0; i < imageDtoList.length; i++) {
          let imageSrc = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,'+ imageDtoList[i].imageBase64);
          this.imagesSrc.push(imageSrc);
          this.albums[i].src = imageDtoList[i].imageBase64;
        }},
        err => {
          console.log("Error occured to get item");
        });
  }

  open(index: number): void {
    this._subscription = this._lightboxEvent.lightboxEvent$.subscribe((event: IEvent) => this._onReceivedEvent(event));

    // override the default config
    this._lightbox.open(this.albums, index, { wrapAround: true, showImageNumberLabel: true });
  }

  private _onReceivedEvent(event: IEvent): void {
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      this._subscription.unsubscribe();
    }
  }

}
