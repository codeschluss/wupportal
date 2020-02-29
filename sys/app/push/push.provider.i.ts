import { Message } from 'nativescript-plugin-firebase';
import { Observable } from 'rxjs';

export interface PushProvider {

  messages: Observable<Message & Notification>;

  registerable: boolean;

  registration(): Observable<string>;

}
