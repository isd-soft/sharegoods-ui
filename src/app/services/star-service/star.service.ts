import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from '@models/item';

export interface Star {
  userId: any;
  movieId: any;
  value: number;

}


@Injectable({
  providedIn: 'root'
})
export class StarService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/';

  public creatingRating(userId, itemId, rating) {
    return this.http.get(this.apiUrl + 'users/' + userId + '/items/' + itemId + '/rating/' + rating);
  }
}

