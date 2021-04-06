import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageDto as Message } from '../../api/models/message-dto';
import { PushControllerService as Service } from '../../api/services/push-controller.service';

@Injectable({
  providedIn: 'root'
})

export class MessageProvider {

  public constructor(
    private service: Service
  ) { }

  public mail(message: Message): Observable<any> {
    return this.service.pushControllerPushMails(message);
  }

  public push(message: Message): Observable<any> {
    return this.service.pushControllerPushNotifications(message);
  }

}
