import { Component, OnInit, Injectable } from '@angular/core';
import { ChatAdapter } from 'ng-chat';
import { Adapter } from '@components/chat-component/adapter';
import { ChatService } from '@services/chat-service';
import { AuthService } from 'app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  // ChatAdapter is needed for ng-chat module
  public adapter = new Adapter();
  public userId;
  
  constructor(private chatService : ChatService,
              private auth : AuthService) { 
  }

  ngOnInit() {
    this.adapter.setChatComponent(this);
    this.chatService = this.chatService;
    this.chatService.setAdapter(this.adapter);
    this.auth.isAuthenticatedObservable().subscribe(this.onAuthUpdate.bind(this), error => { console.log(error);});
  }

   onAuthUpdate(data) {
    if(this.auth.isAuthenticated()) {
      this.userId = this.auth.getCurrentUser().id;
    }
  } 

  setUserId(userId) {
    this.userId = userId
  }
  
  getUserId() {
    return this.userId;
  }

  getChatService() {
    return this.chatService;
  }  
}
