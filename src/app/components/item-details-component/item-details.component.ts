import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { IEvent, Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent } from 'ngx-lightbox';

import { Item } from '@models/item';
import { ItemService } from '@services/item-service/item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  public albums: any = [];
  private _subscription: Subscription;
  itemId: Number;
  itemDetails: any;
  itemDto: Item = new Item();
  imagesSrc: any = [];

  constructor(private router: Router, private itemService: ItemService, private route: ActivatedRoute, private _sanitizer: DomSanitizer,
              private _lightbox: Lightbox, private _lightboxEvent: LightboxEvent, private _lighboxConfig: LightboxConfig) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params.itemId;
    });

    // set default config
    this._lighboxConfig.fadeDuration = 1;

    this.itemService.getItem(this.itemId)
      .subscribe(data => {
          this.itemDetails = data;
          this.itemDto = this.itemDetails.itemDto;
          const imageDtoList = this.itemDetails.imageDtoList;
          for (let i = 0; i < imageDtoList.length; i++) {
            const imageSrc = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + imageDtoList[i].imageBase64);
            this.imagesSrc.push(imageSrc);
            const album = {src: imageSrc, thumb: 'assets/img/image' + (i + 1) + '-thumb.jpg'};
            this.albums.push(album);
          }
        },
        err => {
          console.log('Error occured to get item');
          if (err.status == '404') {
            this.router.navigate(['items']);
          } else {
            alert('Some error has occured ' + err.status);
          }
        });
  }

  open(index: number): void {
    this._subscription = this._lightboxEvent.lightboxEvent$.subscribe((event: IEvent) => this._onReceivedEvent(event));
    this._lightbox.open(this.albums, index, {wrapAround: true, showImageNumberLabel: true});
  }

  private _onReceivedEvent(event: IEvent): void {
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      this._subscription.unsubscribe();
    }
  }
}
