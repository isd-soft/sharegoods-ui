import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefaultErrorService {
  logs = new BehaviorSubject('');
  public logsObservable = this.logs.asObservable();

  constructor(private router: Router) {
  }

  displayErrorPage(logs?: string | Object) {

    if (logs != undefined && logs != '') {

      let strError: string;

      if (logs instanceof Object) {
        strError = JSON.stringify(logs, null, 4);
      } else {
        strError = logs;
      }
      this.logs.next(strError);
    }
    this.router.navigate(['error']);
  }

}
