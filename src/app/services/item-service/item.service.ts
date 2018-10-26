import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Comment } from '@models/comment';
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
    return this.http.get(environment.apiUrl + `/items/${itemId}/comments`);
  }

  public addComment(itemId, userId, comment): Observable<any> {
    const addCommentUrl = environment.apiUrl + `/items/${itemId}/addComment`;
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams().set('userId', userId).set('comment', comment);
    return this.http.post(addCommentUrl, body, {headers: header});
  }

  public createItem(userId, formData) {
    const createItemUrl = environment.apiUrl + `/users/${userId}/items`;
    return this.http.post<Item>(createItemUrl, formData);
  }

  public getItem(itemId) {
    return this.http.get(environment.apiUrl + `/items/${itemId}`);
  }

  // public getItems(sortByValue) {
  //   return this.http.get(this.apiUrl + 'items');
  // }

}
