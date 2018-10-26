import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { AuthService } from 'app/auth/auth.service';
import { Comment } from '@models/comment';
import { ItemService } from '@services/item-service/item.service';
import { User } from '@models/user';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

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
  comments = [];

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
        console.log(this.itemId);
        console.log(data);
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
            console.log(data);
            this.comment = '';
            this.comments = data;
          });
        });
  }

}
