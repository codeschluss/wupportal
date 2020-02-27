import { Message } from 'nativescript-plugin-firebase';
import { Observable } from 'rxjs';

export interface PushProvider {

  clicks: Observable<Message | NotificationOptions>;

  messages: Observable<Message | Notification>;

  registration: Observable<string>;

}
