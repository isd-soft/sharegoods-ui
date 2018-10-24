import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

import { Item } from '@models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getItems() {
    return this.http.get(this.apiUrl + `items`);
  }

  public getComments(itemId) {
    return this.http.get(this.apiUrl + `items/${itemId}`);
  }

  public createItem(userId, formData) {
    const createItemUrl = this.apiUrl + `users/${userId}/items`;
    return this.http.post<Item>(createItemUrl, formData);
  }

  public getItem(itemId) {
    return this.http.get(this.apiUrl + `items/${itemId}`);
  }
}
