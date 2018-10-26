import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

import { Item } from '@models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  public getItems() {
    return this.http.get(environment.apiUrl + `/items`);
  }

  public getComments(itemId) {
    return this.http.get(environment.apiUrl + `/items/${itemId}`);
  }

  public createItem(userId, formData) {
    const createItemUrl = environment.apiUrl + `/users/${userId}/items`;
    return this.http.post<Item>(createItemUrl, formData);
  }

  public getItem(itemId) {
    return this.http.get(environment.apiUrl + `/items/${itemId}`);
  }

  public createRating(userId, itemId, rating) {
    return this.http.get(environment.apiUrl + `/users/${userId}/items/${itemId}/rating/${rating}`);
  }
}
