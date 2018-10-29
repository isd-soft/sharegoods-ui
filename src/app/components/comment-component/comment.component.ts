import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, takeUntil } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';


import { AuthService } from 'app/auth/auth.service';
import { ItemService } from '@services/item-service/item.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  comment: String;
  itemId: any;
  userId: Number;
  comments: any;

  constructor(private router: Router,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params.itemId;
    });

    this.itemService.getComments(this.itemId)
      .subscribe(data => {
        this.comments = data;
      });
  }

  addComment(comment): void {
    this.userId = this.auth.getCurrentUser().id;
    this.itemService.addComment(this.itemId, this.userId, comment).pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          return throwError(`Error occurred adding the comment!`, err);
        })
      ).subscribe(() => {
        this.itemService.getComments(this.itemId)
          .subscribe(data => {
            this.comment = '';
            this.comments = data;
          });
        });
  }

}
