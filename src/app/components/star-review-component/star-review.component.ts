import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { StarService } from '@services/star-service/star.service';
import { Observable } from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.css']
})

export class StarReviewComponent implements OnInit {

  @Input() rating: Number;
  @Input() itemId: Number;
  @Input() userId: Number;
  @Output() ratingClick: EventEmitter<Number> = new EventEmitter();

  constructor(private starService: StarService,
              private route: ActivatedRoute) { }

  creatingRating(index: Number) {
    this.rating = index;
    this.ratingClick.emit(this.rating);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params.userId;
      this.itemId = params.itemId;
    });

    this.starService.createRating(1, 1, 1).subscribe(itemDto => {
        console.log(itemDto);
      },
      eror => {
        console.error(eror);
      });

  }
//console.log(JSON.parse(itemDto).rating);
}

