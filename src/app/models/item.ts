export class Item {
  id?: Number;
  user_id?: Number;
  title?: string;
  description: string;
  dateTime: any;
  author: string;
  rating: Number;
  thumbnail: any;

  constructor() {
    this.title = '';
    this.description = '';
  }

}
