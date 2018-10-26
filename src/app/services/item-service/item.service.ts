import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from '@env/environment';

import { Item } from '@models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  public getSortedItems(value, direction) {
    const params = new HttpParams().set('value', value).set('direction', direction);
    return this.http.get(environment.apiUrl + '/items', {params: params});
  }

  public createItem(userId, formData) {
    const createItemUrl = environment.apiUrl + `/users/${userId}/items`;
    return this.http.post<Item>(createItemUrl, formData);
  }

  public getItem(itemId) {
    return this.http.get(environment.apiUrl + `/items/${itemId}`);
  }

  public getComments(itemId) {
    return this.http.get(environment.apiUrl + `/items/${itemId}`);
  }

}
