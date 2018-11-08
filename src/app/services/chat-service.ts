import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/auth/auth.service';
import { Message, UserStatus } from 'ng-chat';
import { environment } from '@env/environment';
import { ChatMessageServer } from '@models/ChatMessageServer';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient;
  private currentUser;
  private adapter;
  private chatComponent;
  private requestedChatWithUser;
  private email;

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  setAdapter(adapter) {
    this.adapter = adapter;
  }

  setChatComponent(chatComponent) {
    this.chatComponent = chatComponent;
  }

  setCurrentUser() {
    this.currentUser = this.auth.getCurrentUser();
  }

  establishSocket(email) {
    this.email = email;
    const socket = new SockJS(environment.apiUrl + '/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = null;
    this.stompClient.connect({login: email, passcode: ''}, this.onConnected.bind(this), this.onErrorReconnect.bind(this));
  }

  onErrorReconnect(error) {
    console.log(error);
    setTimeout(() => {
      this.establishSocket(this.email);
    }, 1000);
  }

  onConnected() {
    this.setCurrentUser();

    // Connect to personal system channel
    this.stompClient.subscribe('/channel/user/' + this.currentUser.id, this.onSystemMessageReceived.bind(this));

    // Send any message to personal channel to get a list of existing rooms
    const newMessage = new ChatMessageServer;
    newMessage.sender = this.currentUser.id;
    newMessage.content = 'hi';
    newMessage.type = 'CHAT';
    this.stompClient.send('/app/chat/user/' + this.currentUser.id, {}, JSON.stringify(newMessage));
  }

  requestChatRoom(currentUserId, itemUserId) {
    if (this.adapter.getUserById(itemUserId) == null) {
      this.http.get(environment.apiUrl + '/users/' + currentUserId + '/otherUser/' + itemUserId).subscribe((x) => console.log(x));
      this.requestedChatWithUser = itemUserId;
    } else {
      this.openChatWindow(itemUserId);
    }
  }

  onSystemMessageReceived(payload) {

    const message = JSON.parse(payload.body);

    if (message.type == 'STATUS') {
      const user = this.adapter.getUserById(message.user.id);
      if (message.user.status == 'online') {
        user.status = UserStatus.Online;
      } else {
        user.status = UserStatus.Offline;
      }
      return;
    }

    if (message.type == 'ADD') {
      if (message.user.id != this.currentUser.id) {
        alert('Got room info for another user!');
      }

      const userDetails = message.otherUser;
      this.adapter.addUser(userDetails);
      this.adapter.addRoom(message.chatRoomId, message.otherUser.id);

      if (this.requestedChatWithUser == userDetails.id) {
        this.openChatWindow(userDetails.id);
        this.requestedChatWithUser = null;
      }
    }
  }

  openChatWindow(userId) {
    const user = this.adapter.getUserById(userId);
    this.chatComponent.openChatWindow(user);
  }

  onChatMessageReceived(payload) {
    const receivedMessage = JSON.parse(payload.body);
    const messageToShow: Message = new Message();
    messageToShow.toId = receivedMessage.receiver;
    messageToShow.fromId = receivedMessage.sender;
    messageToShow.message = receivedMessage.content;
    this.adapter.getMessage(messageToShow);
  }

  joinRoom(chatRoomId) {
    return this.stompClient.subscribe('/channel/' + chatRoomId, this.onChatMessageReceived.bind(this));
  }

  sendMessage(chatRoomId, message) {
    this.stompClient.send('/app/chat/' + chatRoomId + '/sendMessage', {}, message);
  }
}
