import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {StarService} from '@services/star-service/star.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../../auth/auth.service';
import {ItemService} from '@services/item-service/item.service';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.css']
})

export class StarReviewComponent implements OnInit {

  hovered = 0;
  readonly = false;

  rating: Number = 0;
  itemId: Number;
  userId: Number;
  // updateRate: EventEmitter<Number> = new EventEmitter();


  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private auth: AuthService) {

  }

  // createRating(value: Number) {
  //   this.rating = value;
  //   this.updateRate.next(value);
  //
  // }

  onChange(event) {
    this.itemService.createRating(this.userId, this.itemId, this.rating).subscribe(itemDto => {
              console.log(itemDto);
            },
            eror => {
              console.error(eror);
            });
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params.itemId;
    });
    this.userId = this.auth.getCurrentUser().id;

  }
}

//console.log(JSON.parse(itemDto).rating);


