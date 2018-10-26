import { User } from '@models/user';
import { Item } from '@models/item';
import { Timestamp } from 'rxjs';

export class Comment {
  id?: Number;
  item: Item;
  user: User;
  dateTime?: Timestamp<Date>;
  comment: String;

  constructor(item: Item, user: User, comment: String) {
    this.item = item;
    this.user = user;
    this.comment = comment;
  }
}

