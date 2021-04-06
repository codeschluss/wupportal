import { Injectable, Type } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { TargetGroupControllerService as Service } from '../../api/services/target-group-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { LanguageModel } from '../models/language.model';
import { TargetGroupModel as Model } from '../models/target-group.model';

@Injectable({
  providedIn: 'root'
})

export class TargetGroupProvider
  extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [
    {
      field: 'language',
      method: () => EMPTY,
      model: LanguageModel
    },
    {
      field: 'translatables',
      method: () => EMPTY,
      model: Model
    },
    {
      field: 'translations',
      method: this.service.targetGroupControllerReadTranslationsResponse,
      model: Model
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.targetGroupControllerCreateResponse,
    delete: this.service.targetGroupControllerDeleteResponse,
    readAll: this.service.targetGroupControllerReadAllResponse,
    readOne: this.service.targetGroupControllerReadOneResponse,
    update: this.service.targetGroupControllerUpdateResponse
  };

  protected model: Type<Model> = this.based(Model);

  public constructor(
    protected service: Service
  ) {
    super();
  }

  public create: (model: Partial<Model>) => Observable<any>;

  public update: (model: Partial<Model>) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<Model>;

  public readAll: (params?: Service.TargetGroupControllerReadAllParams) =>
    Observable<Model[]>;

}
