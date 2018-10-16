import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Item } from '../../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8080/';

  public getItems() {
    return this.http.get<Item[]>(this.apiUrl + "items");
  }

  public createItem(userId, item) {
    const createItemUrl = this.apiUrl + 'users/' + userId + '/items';
    const myHeader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('title', item.title);
    body = body.set('description', item.description);
    return this.http.post<Item>(createItemUrl, body, {headers: myHeader});
  }

}
