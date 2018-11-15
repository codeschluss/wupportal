import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TargetGroupControllerService } from '../api/services/target-group-controller.service';
import { TargetGroupModel } from '../models/target-group.model';
import { AbstractProvider } from './abstract.provider';

@Injectable({ providedIn: 'root' })
export class TargetGroupProvider
  extends AbstractProvider<TargetGroupControllerService, TargetGroupModel> {

  protected mapping = {
    findAll: this.service.targetGroupControllerFindAllResponse,
    findOne: this.service.targetGroupControllerFindOneResponse,
    add: this.service.targetGroupControllerAddResponse,
    update: this.service.targetGroupControllerUpdateResponse,
    delete: this.service.targetGroupControllerDeleteResponse
  };

  protected model = TargetGroupModel;

  public constructor(
    protected service: TargetGroupControllerService,
    protected snackbar: MatSnackBar
  ) {
    super();
  }

}
