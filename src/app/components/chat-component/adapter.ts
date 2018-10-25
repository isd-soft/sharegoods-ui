import { ChatAdapter, User, Message, UserStatus } from 'ng-chat';
import { Observable } from "rxjs/Rx";
import { ChatMessageServer } from '@models/ChatMessageServer';

export class Adapter extends ChatAdapter
{

    private chatComponent;

    public setChatComponent(chat) {
        this.chatComponent = chat;
    }
    public users: User[] = [
     {
        id: 33,
        displayName: "Sansa Stark",
        avatar: "http://pm1.narvii.com/6201/dfe7ad75cd32130a5c844d58315cbca02fe5b804_128.jpg",
        status: UserStatus.Online
    },
    {
        id: 10,
        displayName: "Theon Greyjoy",
        avatar: "https://thumbnail.myheritageimages.com/502/323/78502323/000/000114_884889c3n33qfe004v5024_C_64x64C.jpg",
        status: UserStatus.Away
    }];

    public addUser(channelId, user) {
        this.users.push({id: user.id,
                        displayName: user.name,
                        avatar: null,
                        status: UserStatus.Online});
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
        console.log(message);

        let newMessage = new ChatMessageServer;
        newMessage.sender = message.fromId;
        newMessage.content = message.message;
        newMessage.type = "CHAT";

        this.chatComponent.getChatService().sendMessage(10, JSON.stringify(newMessage));

        let user = this.users.find(x => x.id == message.fromId);
        this.onMessageReceived(user, message);
        
    }
}