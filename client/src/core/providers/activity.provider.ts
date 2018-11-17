import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivityControllerService } from '../api/services/activity-controller.service';
import { BaseProvider } from '../base/base.provider';
import { ActivityModel } from '../models/activity.model';

@Injectable({ providedIn: 'root' })
export class ActivityProvider
  extends BaseProvider<ActivityControllerService, ActivityModel> {

  protected methods = {
    findAll: this.service.activityControllerFindAllResponse,
    findOne: this.service.activityControllerFindOneResponse,
    add: this.service.activityControllerAddResponse,
    update: this.service.activityControllerUpdateResponse,
    delete: this.service.activityControllerDeleteResponse
  };

  protected model = ActivityModel;

  public constructor(
    protected service: ActivityControllerService,
    protected snackbar: MatSnackBar
  ) {
    super();
  }

}
