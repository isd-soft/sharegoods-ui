import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/';

  public createRating(userId, itemId, rating) {
    const createRatingUrl = environment.apiUrl + '/users/${userId}/items/${itemId}/rating/${rating}';
    return this.http.post(createRatingUrl, rating);
  }
}

//  public createItem(userId, formData) {
//     const createItemUrl = environment.apiUrl + `/users/${userId}/items`;
//     return this.http.post<Item>(createItemUrl, formData);
//   }

