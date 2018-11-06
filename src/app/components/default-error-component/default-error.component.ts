import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { DefaultErrorService } from '@services/default-error.service';

@Injectable()
@Component({
  selector: 'app-default-error',
  templateUrl: './default-error.component.html',
  styleUrls: ['./default-error.component.css']
})
export class DefaultErrorComponent implements OnInit {

  errorMessage;

  constructor(private router: Router,
              private errorService: DefaultErrorService) {
  }

  ngOnInit() {
    this.errorService.logsObservable.subscribe(data => {
      this.errorMessage = data;
    });
  }
}
