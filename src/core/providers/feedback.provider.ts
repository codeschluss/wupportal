import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../../api/models/feedback';
import { FeedbackControllerService as Service } from '../../api/services/feedback-controller.service';

@Injectable({
  providedIn: 'root'
})

export class FeedbackProvider {

  public constructor(
    private service: Service
  ) { }

  public create(feedback: Feedback): Observable<any> {
    return this.service.feedbackControllerFeedback(feedback);
  }

}
