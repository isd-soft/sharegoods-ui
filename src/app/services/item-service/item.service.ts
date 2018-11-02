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
  
  public getItem(itemId) {
    return this.http.get(environment.apiUrl + `/items/${itemId}`);
  }

  public getItems(value, direction, searchQuery?) {
    let params = new HttpParams().set('value', value).set('direction', direction);
    
    if (searchQuery != undefined) {
      params = params.append('search', searchQuery);
    }
    return this.http.get(environment.apiUrl + '/items', {params: params});
  }

  public getItemsByUser(userId, value, direction, searchQuery?) {
    let params = new HttpParams().set('value', value).set('direction', direction);
    
    if (searchQuery != undefined) {
      params = params.append('search', searchQuery);
    }
    return this.http.get(environment.apiUrl + '/users/' + userId + '/items', {params: params});
  }

  public createItem(userId, formData) {
    const createItemUrl = environment.apiUrl + `/users/${userId}/items`;
    return this.http.post<Item>(createItemUrl, formData);
  }

  public deleteItem(userId) {
    const deleteItemUrl = environment.apiUrl + `/items/${userId}`;
    return this.http.delete(deleteItemUrl, {responseType: 'text'});
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

  public updateComment(itemId, commentId, comment) {
    const updateCommentUrl = environment.apiUrl + `/items/${itemId}/comments/${commentId}`;
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams().set('comment', comment);
    return this.http.put(updateCommentUrl, body, {headers: header});
  }

  public deleteComment(itemId, commentId) {
    return this.http.delete(environment.apiUrl + `/items/${itemId}/comments/${commentId}`, {responseType: 'text'});
  }

  /***** rating ****/

  public createRating(userId, itemId, rating) {
    const addRatingUrl = environment.apiUrl + `/items/${itemId}/addRating`;
    const header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams().set('userId', userId).set('rating', rating);
    return this.http.post(addRatingUrl, body, {headers: header});
  }

  public getAvgRating(itemId) {
    return this.http.get(environment.apiUrl + `/items/${itemId}/getAvgRating/`);
  }

  public getUserRating(userId, itemId) {
    return this.http.get(environment.apiUrl + `/users/${userId}/items/${itemId}/getRating/`);
  }


}
