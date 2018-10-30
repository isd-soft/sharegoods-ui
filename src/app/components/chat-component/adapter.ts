import { ChatAdapter, User, Message, UserStatus } from 'ng-chat';
import { Observable } from "rxjs/Rx";
import { ChatMessageServer } from '@models/ChatMessageServer';

export class Adapter extends ChatAdapter {
  private chatComponent;

  public setChatComponent(chat) {
    this.chatComponent = chat;
  }

  public users: User[] = [];

  public addUser(user) {
    this.users.push({
      id: user.id,
      displayName: user.name,
      avatar: null,
      status: UserStatus.Online
    });
  }

  public getUserById(userId) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id === userId) {
        return this.users[i];
      }
    }
    return null;
  }

  public deleteUserById(userId) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id == userId) {
        this.users.splice(i, 1);
        console.error("Users updated: " + this.users);
      }
    }
  }

  public roomsForUsers = new Array;

  public addRoom(roomId, interlocutor) {
    this.roomsForUsers[interlocutor] = roomId;
  }

  public getRoomsForUsers() {
    return this.roomsForUsers;
  }

  public deleteRoomsAndUsers(roomId) {

    // from rooms array
    console.error("Rooms now: ");
    console.error(this.roomsForUsers);

    let invertedRoomsForUsers = this.invert(this.roomsForUsers);
    let interlocutor = invertedRoomsForUsers[roomId];

    console.error("interlocutor: " + interlocutor);
    this.roomsForUsers.splice(interlocutor, 1);

    console.error("Rooms Updated: " + this.roomsForUsers);

    // from user list
    this.deleteUserById(interlocutor);
  }

  invert(obj) {
    var new_obj = [];
    for (var prop in obj) {
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
    let user = this.users.find(x => x.id == message.fromId);
    this.onMessageReceived(user, message);
  }

  sendMessage(message: Message): void {
    let roomId = this.roomsForUsers[message.toId];
    console.log("roomId: " + roomId)

    let newMessage = new ChatMessageServer;
    newMessage.sender = message.fromId;
    newMessage.content = message.message;
    newMessage.type = "CHAT";

    this.chatComponent.getChatService().sendMessage(roomId, JSON.stringify(newMessage));

    let user = this.users.find(x => x.id == message.fromId);
    this.onMessageReceived(user, message);
  }
}
