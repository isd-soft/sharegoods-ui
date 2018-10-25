import { User } from '@models/user';
import { Item } from '@models/item';
import { Timestamp } from 'rxjs';

export class Comment {
  id?: Number;
  item: Item;
  user: User;
  date_time: Timestamp<Date>;
  comment: String;

  constructor(id: Number, item: Item, user: User, dateTime: Timestamp<Date>, comment: String) {
    this.id = id;
    this.item = item;
    this.user = user;
    this.date_time = dateTime;
    this.comment = comment;
  }
}

