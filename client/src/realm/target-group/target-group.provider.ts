import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@portal/core';
import { Observable } from 'rxjs';
import { TargetGroupControllerService } from '../../api/services/target-group-controller.service';
import { TargetGroupModel } from './target-group.model';

@Injectable({ providedIn: 'root' })
export class TargetGroupProvider
  extends CrudProvider<TargetGroupControllerService, TargetGroupModel> {

  public create: (model: TargetGroupModel) => Observable<any>;

  public update: (model: TargetGroupModel, id: string) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<TargetGroupModel>;

  public readAll: (params?: TargetGroupControllerService
    .TargetGroupControllerReadAllParams) => Observable<TargetGroupModel[]>;

  protected linked: CrudLink[] = [];

  protected methods: CrudMethods = {
    create: this.service.targetGroupControllerCreateResponse,
    delete: this.service.targetGroupControllerDeleteResponse,
    readAll: this.service.targetGroupControllerReadAllResponse,
    readOne: this.service.targetGroupControllerReadOneResponse,
    translate: this.service.targetGroupControllerReadTranslationsResponse,
    update: this.service.targetGroupControllerUpdateResponse
  };

  protected model: Type<TargetGroupModel> = this.based(TargetGroupModel);

  public constructor(
    protected service: TargetGroupControllerService
  ) {
    super();
  }

}
