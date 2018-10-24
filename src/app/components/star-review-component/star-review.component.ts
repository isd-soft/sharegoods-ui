import { Component, OnInit, Input } from '@angular/core';
import { StarService } from '@services/star-service/star.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.css']
})
export class StarReviewComponent implements OnInit {

  @Input() userId;
  @Input() itemId;

  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(private starService: StarService) { }

  ngOnInit() {
    this.starService.creatingRating(1,2,5).subscribe(itemDto => {
      console.log(JSON.parse(itemDto).rating);
    },
      eror => {
      console.error(eror);
      });
  }

}

