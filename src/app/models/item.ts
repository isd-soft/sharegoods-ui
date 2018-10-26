export class Item {
  id: Number;
  userId: Number;
  title: string;
  description: string;
  dateTime: any;
  userName: string;
  rating: Number;
  thumbnail: any;
  userIsOnline: boolean;

  constructor() {
    this.title = '';
    this.description = '';
  }

}
