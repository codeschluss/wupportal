import { Injectable, Type } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { LabelControllerService as Service } from '../../api/services/label-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { LabelModel as Model } from '../models/label.model';
import { LanguageModel } from '../models/language.model';

@Injectable({
  providedIn: 'root'
})

export class LabelProvider
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
      method: this.service.labelControllerReadTranslationsResponse,
      model: Model
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.labelControllerCreateResponse,
    delete: this.service.labelControllerDeleteResponse,
    readAll: this.service.labelControllerReadAllResponse,
    readOne: this.service.labelControllerReadOneResponse,
    update: this.service.labelControllerUpdateResponse
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

  public readAll: (params?: Service.LabelControllerReadAllParams) =>
    Observable<Model[]>;

  public import: (xliff: Blob) =>
    Observable<any> = this.apply(this.service
      .labelControllerImportLabelsResponse);

}
