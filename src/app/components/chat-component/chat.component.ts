import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { IChatController } from 'ng-chat';

import { Adapter } from '@components/chat-component/adapter';
import { ChatService } from '@services/chat-service';
import { AuthService } from '@auth/auth.service';
import { fromEvent } from 'rxjs';

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
  public title = 'Chats';
  public isCollapsed = false;
  public hideFriendsList = true;

  constructor(private chatService: ChatService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.adapter.setChatComponent(this);
    this.chatService.setChatComponent(this);
    this.chatService.setAdapter(this.adapter);
    this.auth.isAuthenticatedObservable().subscribe(this.onAuthUpdate.bind(this), error => {
      console.log(error);
    });
    if (this.auth.isAuthenticated) {
      this.chatService.establishSocket(this.auth.getCurrentUser().email);
    }

    this.onWindowResizeHideFriendsList();
    fromEvent(window, 'resize').subscribe(this.onWindowResizeHideFriendsList.bind(this));
  }

  onWindowResizeHideFriendsList() {
    if(window.innerWidth <= 800 || window.innerHeight <= 600){
      this.setUserId = null;
    } else {
      this.onAuthUpdate();
    }
  }

  openChatWindow(user) {
    this.ngChatInstance.triggerOpenChatWindow(user);
    this.isCollapsed = false;
  }

  onAuthUpdate() {
    if (this.auth.isAuthenticated()) {
      this.userId = this.auth.getCurrentUser().id;
    }
  }

  setUserId(userId) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }

  getChatService() {
    return this.chatService;
  }
}
