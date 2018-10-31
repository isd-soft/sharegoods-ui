import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  public getItem(itemId) {
    return this.http.get(environment.apiUrl + `/items/${itemId}`);
  }

  public getItemsByTitle(title, value, direction) {
    const params = new HttpParams().set('title', title).set('value', value).set('direction', direction);
    return this.http.get(environment.apiUrl + `/items/search`, {params: params});
  }

  public createItem(userId, formData) {
    const createItemUrl = environment.apiUrl + `/users/${userId}/items`;
    return this.http.post<Item>(createItemUrl, formData);
  }

  /***** comments *****/

  public addComment(itemId, userId, comment): Observable<any> {
    const addCommentUrl = environment.apiUrl + `/items/${itemId}/addComment`;
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams().set('userId', userId).set('comment', comment);
    return this.http.post(addCommentUrl, body, {headers: header});
  }

  public getComments(itemId) {
    return this.http.get(environment.apiUrl + `/items/${itemId}/comments`);
  }

  public updateComment(commentId, comment) {
    const updateCommentUrl = environment.apiUrl + `/comments/${commentId}`;
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams().set('comment', comment);
    return this.http.put(updateCommentUrl, body, {headers: header})
  }

  public deleteComment(itemId, commentId) {
    return this.http.delete(environment.apiUrl + `/items/${itemId}/comments/${commentId}`, {responseType:'text'});
  }

}
