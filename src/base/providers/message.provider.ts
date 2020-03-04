import { Injectable } from '@angular/core';
import { Response } from '@wooportal/core';
import { MessageDto as Message } from '../../api/models/message-dto';
import { PushControllerService } from '../../api/services/push-controller.service';

@Injectable({ providedIn: 'root' })
export class MessageProvider {

  public constructor(
    private service: PushControllerService
  ) { }

  public mail(message: Message): Response {
    return this.service.pushControllerPushMailsResponse(message);
  }

  public push(message: Message): Response {
    return this.service.pushControllerPushNotificationsResponse(message);
  }

}
