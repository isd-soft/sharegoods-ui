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
    const socket = new SockJS(environment.apiUrl + '/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({login: email, passcode: ''}, this.onConnected.bind(this));
    this.setCurrentUser();
  }

  onConnected() {
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

    if (message.type == 'REMOVE') {
      this.adapter.deleteRoomsAndUsers(message.chatRoomId);
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
    const a: boolean = this.adapter.addRoom(message.chatRoomId, message.otherUser.id);

    // Subscribe to messages from this user's room
    if (a) {
      this.joinRoom(message.chatRoomId);
    }

    // Open chat window if requested a new chat with this user
    if (this.requestedChatWithUser == userDetails.id) {
      this.openChatWindow(userDetails.id);
      this.requestedChatWithUser = null;
    }
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
