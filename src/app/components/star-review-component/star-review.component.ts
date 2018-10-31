import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {ItemService} from '@services/item-service/item.service';
import {Subject, throwError} from 'rxjs';
import {catchError, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.css']
})

export class StarReviewComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  readonly = false;
  rating: any ;
  itemId: Number;
  userId: Number;
  item: any;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private auth: AuthService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params.itemId;
    });
    this.userId = this.auth.getCurrentUser().id;


    this.itemService.getAvgRating(this.itemId)
      .subscribe(itemDto => {
        console.log(this.itemId);
        this.item = itemDto;
        if (this.item.rating == null) {
          this.item.rating = 0;
          }
        console.log(itemDto);
      });
  }

  onChange(event) {
    this.itemService.createRating(this.userId, this.itemId, this.rating).pipe(
      takeUntil(this.destroy$),
      catchError( err => {
        return throwError(`Error accured adding Rating`, err);
      })
    ).subscribe ( () => {
      this.itemService.getAvgRating(this.itemId)
        .subscribe( itemDto => {
          this.item = itemDto;
            console.log(itemDto);
        });
    });
  }
}



