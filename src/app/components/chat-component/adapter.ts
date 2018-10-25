import { ChatAdapter, User, Message, UserStatus } from 'ng-chat';
import { Observable } from "rxjs/Rx";

export class Adapter extends ChatAdapter
{
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
    
    sendMessage(message: Message): void {
//        let replyMessage = new Message();
        
//        replyMessage.fromId = message.toId;
//        replyMessage.toId = message.fromId;
//        replyMessage.message = message.message;
        
//        let user = this.users.find(x => x.id == replyMessage.fromId);

        let user = this.users.find(x => x.id == message.fromId);
        this.onMessageReceived(user, message);
    }
}