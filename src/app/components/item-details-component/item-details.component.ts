import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { IEvent, Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent } from 'ngx-lightbox';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { NgxSpinnerService } from "ngx-spinner";

import { ItemService } from '@services/item-service/item.service';
import { Item } from '@models/item';
import { ChatComponent } from '@components/chat-component/chat.component';
import { AuthService } from '@auth/auth.service';
import { DefaultErrorService } from '@services/default-error.service';
import { StarReviewComponent } from '@components/star-review-component/star-review.component';
import { environment } from '@env/environment';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  @ViewChild(StarReviewComponent) ratingComponent;

  public albums: any = [];
  private _subscription: Subscription;
  itemId;
  itemDetails: any;
  userIsOnline;
  itemDto: Item = new Item();
  imagesSrc: any = [];
  showContactAuthorButton = false;

  showSuccessfullyDeleted;
  showAlreadyDeleted;
  showCouldNotDelete;

  constructor(private router: Router, private itemService: ItemService, private route: ActivatedRoute, private _sanitizer: DomSanitizer,
              private _lightbox: Lightbox, private _lightboxEvent: LightboxEvent, private _lighboxConfig: LightboxConfig,
              private auth: AuthService, private chat: ChatComponent, private errorService: DefaultErrorService,
              private spinner: NgxSpinnerService, private http: HttpClient) {
  }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.itemId = params.itemId;
    });

    // set default config
    this._lighboxConfig.fadeDuration = 1;

    this.itemService.getItem(this.itemId)
      .subscribe(data => {
          this.itemDetails = data;
          this.userIsOnline = this.itemDetails.userIsOnline;
          this.itemDto = this.itemDetails.itemDto;
          const imageDtoList = this.itemDetails.imageDtoList;

          for (let i = 0; i < imageDtoList.length; i++) {
            const imageSrc = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + imageDtoList[i].imageBase64);
            this.imagesSrc.push(imageSrc);
            const album = {src: imageSrc};
            this.albums.push(album);
          }
          this.checkIfShowContactAuthorButton();
        },
        err => {
          if (err.status == '404') {
            this.router.navigate(['items']);
          } else {
            alert('Some error has occurred ' + err.status);
          }
        });

    Observable.interval(5000)
    .switchMap(() => this.http.get(environment.apiUrl + '/users/' + this.itemDto.userId + '/status'))
        .subscribe((data) => {
          this.userIsOnline = data;
          this.checkIfShowContactAuthorButton();
        });
    this.spinner.hide();

  }

  isItemOfCurrentUser() {
    if (this.auth.isAdmin()) {
      return true;
    } else if (this.auth.isAuthenticated()) {
      return this.auth.getCurrentUser().id == this.itemDto.userId;
    }
  }

  checkIfShowContactAuthorButton() {
    if (this.auth.isAuthenticated()) {
      if (this.userIsOnline) {
        if (this.auth.getCurrentUser().id != this.itemDto.userId) {
          this.showContactAuthorButton = true;
          return;
        }
      }
    }
    this.showContactAuthorButton = false;
    return;
  }

  isLoggedUserItem() {
    return this.auth.isAuthenticated() && this.auth.getCurrentUser().id == this.itemDto.userId;
  }

  editButtonPressed() {
    this.router.navigate(['items/' + this.itemId + '/edit']);
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
        if (error.status == 404) {
          this.showAlreadyDeleted = true;
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        } else {
          this.showCouldNotDelete = true;
          setTimeout(() => {
            this.errorService.displayErrorPage(error);
          }, 2000);
        }
      });
  }
}
