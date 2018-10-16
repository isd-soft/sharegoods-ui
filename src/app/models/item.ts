export class Item {
  _id: Number;
  user_id: Number;
  title: string;
  description: string;

  constructor() {
    this.title = '';
    this.description = '';
  }
}
