import { ChatAdapter, User, Message, UserStatus } from 'ng-chat';
import { Observable } from 'rxjs-compat/Observable';
import { BehaviorSubject, of } from 'rxjs';
//import 'rxjs-compat/add/observable/of';

import { ChatMessageServer } from '@models/ChatMessageServer';

export class Adapter extends ChatAdapter {

  private chatComponent;
  public users: User[] = [];
  public usersSubject = new BehaviorSubject(this.users);
  public usersObservable = this.usersSubject.asObservable();
  public roomsForUsers: any[] = [];

  public setChatComponent(chat) {
    this.chatComponent = chat;
  }

  public addUser(user) {
    if (this.getUserById(user.id) == null) {
      this.users.push({
        id: user.id,
        displayName: user.name,
        avatar: null,
        status: UserStatus.Online
      });
      this.usersSubject.next(user);
    }
  }

  public getUserById(userId) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === userId) {
        return this.users[i];
      }
    }
    return null;
  }

  public deleteUserById(userId) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == userId) {
        this.users.splice(i, 1);
        console.error('Users updated: ' + this.users);
      }
    }
  }

  public getRoomsForUsers() {
    return this.roomsForUsers;
  }

  public addRoom(roomId, interlocutor) {

    if (typeof this.roomsForUsers[interlocutor] !== 'undefined') {
      this.roomsForUsers[interlocutor]['roomSubscription'].unsubscribe();
    }

    let newRoom = {};
    newRoom['roomSubscription'] = this.chatComponent.getChatService().joinRoom(roomId);
    newRoom['roomId'] = roomId;
    this.roomsForUsers[interlocutor] = newRoom;
  }

  public deleteRoomsAndUsers(roomId) {

    // Delete from rooms array
    let invertedRoomsForUsers: any[];
    let interlocutor: any;
    invertedRoomsForUsers = this.invert(this.roomsForUsers);
    interlocutor = invertedRoomsForUsers[roomId];
    this.roomsForUsers.splice(interlocutor, 1);

    // Delete from user list
    this.deleteUserById(interlocutor);
  }

  invert(obj) {
    const new_obj = [];
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        new_obj[obj[prop]] = prop;
      }
    }
    console.error(new_obj);
    return new_obj;
  }

  listFriends(): Observable<User[]> {
    return of(this.users);
  }

  getMessageHistory(userId: any): Observable<Message[]> {
    return of([]);
  }

  getMessage(message: Message): void {
    let user = this.users.find(x => x.id == message.fromId);
    this.onMessageReceived(user, message);
  }

  sendMessage(message: Message): void {
    const newMessage = new ChatMessageServer;
    newMessage.sender = message.fromId;
    newMessage.receiver = message.toId;
    newMessage.content = message.message;
    newMessage.type = 'CHAT';

    const roomId = this.roomsForUsers[message.toId]['roomId'];
    this.chatComponent.getChatService().sendMessage(roomId, JSON.stringify(newMessage));
  }
} 
