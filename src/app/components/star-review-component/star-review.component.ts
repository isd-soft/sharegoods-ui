import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '@auth/auth.service';
import { ItemService } from '@services/item-service/item.service';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.css']
})

export class StarReviewComponent implements OnInit {

  readonly = false;
  rating = 0;
  yourVote: any = Number;
  itemId: Number;
  userId: Number;
  item: any = Number;
  isAlert: boolean;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private auth: AuthService) {

  }

  ngOnInit() {
    /***** Checks if userId and itemId are real ****/
    this.route.params.subscribe(params => {
      this.itemId = params.itemId;
    });

    if (this.auth.isAuthenticated()) {
      this.userId = this.auth.getCurrentUser().id;

      /***** getUserRating and save it to the screen  ****/
      this.itemService.getUserRating(this.userId, this.itemId)
        .subscribe(ratingDto => {
          this.yourVote = ratingDto;
          this.readonly = true;
        }, error => {
          if (error.status == 404) {
          }
        });
    }

    /***** Get AvgRating and Transform null avgRating into 0 ****/
    this.getAverageRating(this.itemId);
  }

  /***** CreateRating  ****/
  onRate() {
    if (!this.readonly) {
      this.itemService.createRating(this.userId, this.itemId, this.rating).subscribe(this.onCreateSuccess.bind(this),
        error1 => {
        });
    } else {
      this.isAlert = true;
    }
  }

  onCreateSuccess(itemDto) {
    this.item = itemDto;
    this.readonly = true;
    this.itemService.getUserRating(this.userId, this.itemId).subscribe(ratingDto => {
      this.yourVote = ratingDto;
    });
    this.getAverageRating(this.itemId);
  }

  getAverageRating(itemId) {
    this.itemService.getAvgRating(itemId)
      .subscribe(itemDto => {
        this.item = itemDto;
        if (this.item.rating == null) {
          this.item.rating = 0;
        }
      });
  }

}
