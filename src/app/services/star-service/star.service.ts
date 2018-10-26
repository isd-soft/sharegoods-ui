import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  constructor(private http: HttpClient) {
  }

  // private apiUrl = 'http://localhost:8080/';

  public createRating(userId, itemId, rating) {
    return this.http.get(environment.apiUrl + '/users/' + userId + '/items/' + itemId + '/rating/' + rating);


    // const createRatingUrl = environment.apiUrl + '/users/${userId}/items/${itemId}/rating/${rating}';
    // return this.http.get(createRatingUrl);
  }

}

