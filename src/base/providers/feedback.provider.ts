import { Injectable } from '@angular/core';
import { StrictHttpResponse } from '@wooportal/core';
import { Observable } from 'rxjs';
import { FeedbackControllerService } from '../../api/services/feedback-controller.service';
import { FeedbackModel } from '../models/feedback.model';

@Injectable({ providedIn: 'root' })
export class FeedbackProvider {

  public constructor(
    private service: FeedbackControllerService
  ) { }

  public create(model: FeedbackModel): Observable<StrictHttpResponse<any>> {
    return this.service.feedbackControllerFeedbackResponse(model);
  }

}
