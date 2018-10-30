import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { ChatAdapter, IChatController, User } from 'ng-chat';
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

  @ViewChild('ngChatInstance')
  protected ngChatInstance: IChatController;

  // The following fields are needed for ng-chat module
  public adapter = new Adapter();
  public userId;
  public title = "Chats";
  public isCollapsed = false;

  constructor(private chatService : ChatService,
              private auth : AuthService) {
  }

  ngOnInit() {
    this.adapter.setChatComponent(this);
    this.chatService.setChatComponent(this);
    this.chatService.setAdapter(this.adapter);
    this.auth.isAuthenticatedObservable().subscribe(this.onAuthUpdate.bind(this), error => { console.log(error);});
  }

  openChatWindow(user) {
    this.ngChatInstance.triggerOpenChatWindow(user);
    this.isCollapsed = false;
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
