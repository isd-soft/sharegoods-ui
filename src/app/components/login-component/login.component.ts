import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { User } from 'app/models/user';
import { ChatComponent } from 'app/components/chat-component/chat.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private model: any = {};
  private authFailed = false;
  private authSuccess = false;
  private registerSuccess = false;

  constructor(
    private router : Router,
    private auth : AuthService,
    private route : ActivatedRoute,
    private chat : ChatComponent
    ) {
      if(auth.isAuthenticated()) {
        router.navigate(['items']);
      }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['newuser']) {
        this.registerSuccess = true;
      }
    });
  }

  login() {

    this.auth.isLoginDataValid(this.model.email, this.model.password)
      .subscribe(user => {
          this.auth.setCurrentUser(user);
          this.auth.setToken(this.model.email,  this.model.password);
          this.authFailed = false;
          this.authSuccess = true;          

          // Connect to chat server
          this.chat.getChatService().establishSocket(this.model.email, this.model.password);
          
          this.router.navigate(['items']);
        },
        err => {
          if (err.status == '404') {
            this.authFailed = true;
          } else {
            alert('Some error occured: ' + err.error);
          }
        });
  }
}
