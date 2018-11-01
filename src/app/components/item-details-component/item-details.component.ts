import { Component, OnInit, ViewChild , ElementRef } from '@angular/core';
import { Item } from "../../models/item";
import { ActivatedRoute, Router } from "@angular/router";
import { ItemService } from "../../services/item-service/item.service";
import { DomSanitizer } from "@angular/platform-browser";
import { IEvent, Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent } from "ngx-lightbox";
import { Subscription } from "rxjs/Rx";
import { ChatComponent } from 'app/components/chat-component/chat.component';
import { AuthService } from 'app/auth/auth.service';
import { DefaultErrorService } from 'app/services/default-error.service';

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
  userIsOnline;
  itemDto: Item = new Item();
  imagesSrc: any = new Array();
  showContactAuthorButton : boolean = false;
  itemComments: any;

  showSuccessfullyDeleted;
  showAlreadyDeleted;
  showCouldNotDelete;

  constructor(private router: Router, private itemService: ItemService, private route: ActivatedRoute, private _sanitizer: DomSanitizer,
              private _lightbox: Lightbox, private _lightboxEvent: LightboxEvent, private _lighboxConfig: LightboxConfig,
              private auth : AuthService, private chat : ChatComponent, private errorService : DefaultErrorService) {
  }

  isItemOfCurrentUser() {
    if (this.auth.isAdmin()) {
      return true;
    } else if (this.auth.isAuthenticated()) {
      if (this.auth.getCurrentUser().id == this.itemDto.userId) {
        return true;
      }
      return false;
    }
  }

  checkIfShowContactAuthorButton() {
    if(this.auth.isAuthenticated()) {
      if(this.itemDetails.userIsOnline) {
        if(this.auth.getCurrentUser().id != this.itemDto.userId) {
          this.showContactAuthorButton = true;
          return;
        }
      }
    }
    this.showContactAuthorButton = false;
    return;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params.itemId;
    });

     // set default config
    this._lighboxConfig.fadeDuration = 1;

    this.itemService.getItem(this.itemId)
      .subscribe( data => {
        this.itemDetails = data;
        this.userIsOnline = this.itemDetails.userIsOnline;
        this.itemDto = this.itemDetails.itemDto;
        let imageDtoList = this.itemDetails.imageDtoList;

        for(let i = 0; i < imageDtoList.length; i++) {
          let imageSrc = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,'+ imageDtoList[i].imageBase64);
          this.imagesSrc.push(imageSrc);
          const album = {src: imageSrc};
          this.albums.push(album);
          };

          this.checkIfShowContactAuthorButton();

        },
        err => {
          if (err.status == '404') {
            this.router.navigate(['items']);
          } else {
            alert('Some error has occured ' + err.status);
          }
        });
  }

  ngAfterViewInit() {
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

  startChat() {
    this.chat.getChatService().requestChatRoom(this.auth.getCurrentUser().id, this.itemDto.userId);
  }

  deleteItem() {
    this.itemService.deleteItem(this.itemId).subscribe(
      data => {
        
        this.showSuccessfullyDeleted = true;
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 2000);
      }, 
      error => {
        if(error.status == 404) {
          this.showAlreadyDeleted = true;
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        } else {
          this.showCouldNotDelete = true;
          setTimeout(() => {
            this.errorService.displayErrorPage(error)
          }, 2000);
        }   
      });
  }
}
