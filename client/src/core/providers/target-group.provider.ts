import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TargetGroupControllerService } from '../api/services/target-group-controller.service';
import { CrudService } from '../crud/crud.provider';
import { TargetGroupModel } from '../models/target-group.model';

@Injectable({ providedIn: 'root' })
export class TargetGroupProvider
  extends CrudService<TargetGroupControllerService, TargetGroupModel> {

  public create: (model: TargetGroupModel) => Promise<any>;

  public update: (id: string, model: TargetGroupModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public findOne: (id: string) => Promise<TargetGroupModel>;

  public findAll: (params?: TargetGroupControllerService
    .TargetGroupControllerFindAllParams) => Promise<TargetGroupModel[]>;

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
  ) {
    super();
  }

}
