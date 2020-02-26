import { Observable } from 'rxjs';

export interface PushProvider {

  clicks: Observable<NotificationOptions>;

  messages: Observable<Notification>;

  registration: Observable<string>;

}
