import { Injectable } from '@angular/core';
import { Response } from '@wooportal/core';
import { Feedback } from '../../api/models/feedback';
import { FeedbackControllerService } from '../../api/services/feedback-controller.service';

@Injectable({ providedIn: 'root' })
export class FeedbackProvider {

  public constructor(
    private service: FeedbackControllerService
  ) { }

  public create(feedback: Feedback): Response {
    return this.service.feedbackControllerFeedbackResponse(feedback);
  }

}
