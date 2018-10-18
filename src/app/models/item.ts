export class Item {
  _id: Number;
  user_id: Number;
  title: string;
  description: string;
  dateTime: any;

  constructor() {
    this.title = '';
    this.description = '';
  }
}
