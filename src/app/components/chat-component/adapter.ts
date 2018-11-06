import { ChatAdapter, User, Message, UserStatus } from 'ng-chat';
import { Observable } from 'rxjs-compat/Observable';
import { BehaviorSubject } from 'rxjs';
import 'rxjs-compat/add/observable/of';

import { ChatMessageServer } from '@models/ChatMessageServer';

export class Adapter extends ChatAdapter {

  private chatComponent;
  public users: User[] = [];
  public usersSubject = new BehaviorSubject(this.users);
  public usersObservable = this.usersSubject.asObservable();
  public roomsForUsers = [];

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

    if (this.roomsForUsers[interlocutor] != roomId) {
      this.roomsForUsers[interlocutor] = roomId;
      return true;
    }
    return false;
  }

  public deleteRoomsAndUsers(roomId) {

    // from rooms array
    console.error('Rooms now: ');
    console.error(this.roomsForUsers);

    let invertedRoomsForUsers: any[];
    let interlocutor: any;
    invertedRoomsForUsers = this.invert(this.roomsForUsers);
    interlocutor = invertedRoomsForUsers[roomId];

    console.error('interlocutor: ' + interlocutor);
    this.roomsForUsers.splice(interlocutor, 1);

    console.error('Rooms Updated: ' + this.roomsForUsers);

    // from user list
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
    return Observable.of(this.users);
  }

  getMessageHistory(userId: any): Observable<Message[]> {
    return Observable.of([]);
  }

  getMessage(message: Message): void {
    const user = this.users.find(x => x.id == message.fromId);
    this.onMessageReceived(user, message);
  }

  sendMessage(message: Message): void {
    const roomId = this.roomsForUsers[message.toId];
    console.log('roomId: ' + roomId);

    const newMessage = new ChatMessageServer;
    newMessage.sender = message.fromId;
    newMessage.content = message.message;
    newMessage.type = 'CHAT';

    this.chatComponent.getChatService().sendMessage(roomId, JSON.stringify(newMessage));

    const user = this.users.find(x => x.id == message.fromId);
    this.onMessageReceived(user, message);
  }
}
