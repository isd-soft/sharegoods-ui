import { User } from '@models/user';
import { Item } from '@models/item';
import { Timestamp } from 'rxjs';

export class Comment {
  id?: Number;
  item: Item;
  user: User;
  dateTime?: Timestamp<Date>;
  text: String;

  constructor(item: Item, user: User, text: String) {
    this.item = item;
    this.user = user;
    this.text = text;
  }
}

