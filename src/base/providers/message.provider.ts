import { Injectable } from '@angular/core';
import { Response } from '@wooportal/core';
import { MessageDto as Message } from '../../api/models/message-dto';
import { PushControllerService } from '../../api/services/push-controller.service';

@Injectable({ providedIn: 'root' })
export class MessageProvider {

  public constructor(
    private service: PushControllerService
  ) { }

  public pushNews(message: Message): Response {
    return this.service.pushControllerPushNewsResponse(message);
  }

  public pushContent(message: Message, route: string): Response {
    return this.service.pushControllerPushContentResponse(message, route);
  }

}
