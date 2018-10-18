export class Item {
  id: Number;
  user_id: Number;
  title: string;
  description: string;
  dateTime: any;
  author: string;
  rating: Number;

  constructor() {
    this.title = '';
    this.description = '';
  }
}
