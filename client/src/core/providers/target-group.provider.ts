import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TargetGroupControllerService } from '../api/services/target-group-controller.service';
import { BaseProvider } from '../base/base.provider';
import { TargetGroupModel } from '../models/target-group.model';

@Injectable({ providedIn: 'root' })
export class TargetGroupProvider
  extends BaseProvider<TargetGroupControllerService, TargetGroupModel> {

  protected linked = [];

  protected methods = {
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
