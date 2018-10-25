import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get(environment.apiUrl + `/items/${itemId}`);
  }

  public addComment(comment: Comment): Observable<Comment> {
    const addCommentUrl = environment.apiUrl + `/items/{id}/addComment`;
    return this.http.post<Comment>(addCommentUrl, comment);
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
