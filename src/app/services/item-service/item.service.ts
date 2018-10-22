import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from '@models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  private apiUrl = 'http://localhost:8080/';

  public getItems() {
    return this.http.get(this.apiUrl + 'items');
  }

  public createItem(userId, formData) {
    const createItemUrl = this.apiUrl + 'users/' + userId + '/items';
    return this.http.post<Item>(createItemUrl, formData);
  }

  public getItem(itemId) {
    return this.http.get(this.apiUrl + 'items/' + itemId);
  }



}
