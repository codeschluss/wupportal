import { Message } from 'nativescript-plugin-firebase';
import { Observable } from 'rxjs';

export interface PushProvider {

  enabled: boolean;

  messages: Observable<Message & Notification>;

  registration(): Observable<string>;

}
