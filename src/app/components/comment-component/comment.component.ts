import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'app/auth/auth.service';
import { ItemService } from '@services/item-service/item.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  itemId: Number;
  userId: Number;
  comment: String;
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

    this.getComments();
    this.userId = this.auth.getCurrentUser().id;
  }

  addComment() {
    this.comment = this.comment.replace(/(\n|\r|\n)+$/g,'');
    if (!this.comment) {
      return;
    }
    let newComment = this.comment;
    this.comment = '';
    this.itemService.addComment(this.itemId, this.userId, newComment)
      .subscribe(data => {
          this.getComments();
        },
        err => {
          console.log('Error occurred adding the comment');
        });
  }

  getComments() {
    this.itemService.getComments(this.itemId)
      .subscribe(data => {
        this.comments = data;
      });
  }

}
