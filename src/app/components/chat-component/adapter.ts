import { ChatAdapter, User, Message, UserStatus } from 'ng-chat';
import { Observable } from "rxjs/Rx";
import { ChatMessageServer } from '@models/ChatMessageServer';

export class Adapter extends ChatAdapter
{

    private chatComponent;

    public setChatComponent(chat) {
        this.chatComponent = chat;
    }

    public users: User[] = [];

    public addUser(user) {
        this.users.push({id: user.id,
                        displayName: user.name,
                        avatar: null,
                        status: UserStatus.Online});
    }

    public deleteUser() {}

    public roomsForUsers = new Array;

    public addRoom(roomId, interlocutor) {
        this.roomsForUsers[interlocutor] = roomId;
    }

    public getRoomsForUsers() {
        return this.roomsForUsers;
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