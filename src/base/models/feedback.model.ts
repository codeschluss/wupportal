import { CrudModel } from '@wooportal/core';
import { Feedback } from '../../api/models/feedback';

export class FeedbackModel
  extends CrudModel implements Feedback {

  public rating: number;
  public senderMail: string;
  public text: string;

}
