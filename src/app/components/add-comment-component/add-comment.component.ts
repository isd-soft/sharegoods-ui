import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { AuthService } from 'app/auth/auth.service';
import { Comment } from '@models/comment';
import { ItemService } from '@services/item-service/item.service';
import { User } from '@models/user';
import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  comment: Comment;
  text = 'Hello Comments';
  item: any;
  itemId: any;
  user: User;

  constructor(private router: Router,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private auth: AuthService) {
    if (auth.isAuthenticated()) {
      return;
    }
    router.navigate(['items']);
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itemId = params.itemId;
    });
  }

  addComment(): void {
    this.user = this.auth.getCurrentUser();
    this.itemService.getItem(this.itemId).pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        return throwError(`Couldn't get the the item!`, err);
      })
    ).subscribe(item => {
        this.item = item;
        this.comment = new Comment(this.item, this.user, this.text);
        this.itemService.addComment(this.comment).pipe(
          takeUntil(this.destroy$),
          catchError(err => {
            return throwError(`Error occurred adding the comment!`, err);
          })
        ).subscribe(() => {
            console.log('The comment added successfully');
          }
        );
      }
    );
  }
}
