import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/auth/auth.service';
import { Message } from 'ng-chat';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient;
  private personalChannel;
  private currentUser;
  private adapter;
  private chatComponent;

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

  establishSocket(email, pass) {
    // Check if connection already exists ?
    const socket = new SockJS(environment.apiUrl + '/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({login: email, passcode: pass}, this.onConnected.bind(this));
    this.setCurrentUser();
  }

  onConnected() {
    this.personalChannel = this.stompClient.subscribe('/channel/user/' + this.currentUser.id, this.onSystemMessageReceived.bind(this));

    // What's in there I wonder?
    console.log(this.personalChannel);
  }

  requestChatRoom(currentUserId, itemUserId) {
    if (this.adapter.getUserById(itemUserId) == null) {
      this.http.get(environment.apiUrl + '/users/' + currentUserId + '/accessItem/' + itemUserId).subscribe((x) => console.log(x));
    } else {
      this.openChatWindow(itemUserId);
    }
  }

  onSystemMessageReceived(payload) {

    const message = JSON.parse(payload.body);

    if (message.type == 'REMOVE') {
      this.adapter.deleteRoomsAndUsers(message.chatRoomId);
      // Close window with this user!
      return;
    }

    // Get user data, check if same for current user
    if (message.user.id != this.currentUser.id) {
      alert('Got room info for another user!');
    }

    // Get author data, create new chat user (also need to pass corresponding room id)
    const userDetails = message.otherUser;
    this.adapter.addUser(userDetails);

    // Get a room!
    this.adapter.addRoom(message.chatRoomId, message.otherUser.id);
    console.log('Current rooms');
    console.log(this.adapter.getRoomsForUsers());

    // Subscribe to messages from this user's room
    this.joinRoom(message.chatRoomId);

    // Open chat window for initiator
    this.openChatWindow(userDetails.id);
  }

  openChatWindow(userId) {
    const user = this.adapter.getUserById(userId);
    this.chatComponent.openChatWindow(user);
  }

  onChatMessageReceived(payload) {
    const receivedMessage = JSON.parse(payload.body);
    console.log('Contents of received message: ' + receivedMessage.content);

    const messageToShow: Message = new Message();
    messageToShow.toId = this.currentUser.id;
    messageToShow.fromId = receivedMessage.sender;
    messageToShow.message = receivedMessage.content;


    console.log('Message to show object:');
    console.log(messageToShow);

    this.adapter.getMessage(messageToShow);
  }

  joinRoom(chatRoomId) {
    this.stompClient.subscribe('/channel/' + chatRoomId, this.onChatMessageReceived.bind(this));
  }

  sendMessage(chatRoomId, message) {
    this.stompClient.send('/app/chat/' + chatRoomId + '/sendMessage', {}, message);

  }
}
