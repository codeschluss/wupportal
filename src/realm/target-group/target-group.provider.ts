import { Injectable, Injector } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { TargetGroupControllerService } from '../../api/services/target-group-controller.service';
import { TargetGroupModel } from './target-group.model';

@Injectable({ providedIn: 'root' })
export class TargetGroupProvider
  extends CrudProvider<TargetGroupControllerService, TargetGroupModel> {

  public create: (model: TargetGroupModel) => Promise<any>;

  public update: (id: string, model: TargetGroupModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public readOne: (id: string) => Promise<TargetGroupModel>;

  public readAll: (params?: TargetGroupControllerService
    .TargetGroupControllerReadAllParams) => Promise<TargetGroupModel[]>;

  protected linked = [];

  protected methods = {
    create: this.service.targetGroupControllerCreateResponse,
    delete: this.service.targetGroupControllerDeleteResponse,
    readAll: this.service.targetGroupControllerReadAllResponse,
    readOne: this.service.targetGroupControllerReadOneResponse,
    translate: this.service.targetGroupControllerReadTranslationsResponse,
    update: this.service.targetGroupControllerUpdateResponse
  };

  protected model = this.based(TargetGroupModel);

  public constructor(
    protected injector: Injector,
    protected service: TargetGroupControllerService
  ) {
    super();
  }

}
