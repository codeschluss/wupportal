import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TargetGroupControllerService } from '../api/services/target-group-controller.service';
import { BaseProvider } from '../base/base.provider';
import { TargetGroupModel } from '../models/target-group.model';

@Injectable({ providedIn: 'root' })
export class TargetGroupProvider
  extends BaseProvider<TargetGroupControllerService, TargetGroupModel> {

  protected linked = [];

  protected methods = {
    create: this.service.targetGroupControllerAddResponse,
    delete: this.service.targetGroupControllerDeleteResponse,
    findAll: this.service.targetGroupControllerFindAllResponse,
    findOne: this.service.targetGroupControllerFindOneResponse,
    update: this.service.targetGroupControllerUpdateResponse
  };

  protected model = this.based(TargetGroupModel);

  public constructor(
    protected injector: Injector,
    protected service: TargetGroupControllerService,
    protected snackbar: MatSnackBar
  ) { super(); }

}
