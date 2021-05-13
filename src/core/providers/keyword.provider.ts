import { Injectable, Type } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { TagControllerService as Service } from '../../api/services/tag-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { KeywordModel as Model } from '../models/keyword.model';
import { LanguageModel } from '../models/language.model';

@Injectable({
  providedIn: 'root'
})

export class KeywordProvider
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
      method: this.service.tagControllerReadTranslationsResponse,
      model: Model
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.tagControllerCreateResponse,
    delete: this.service.tagControllerDeleteResponse,
    readAll: this.service.tagControllerReadAllResponse,
    readOne: this.service.tagControllerReadOneResponse,
    update: this.service.tagControllerUpdateResponse
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

  public readAll: (params?: Service.TagControllerReadAllParams) =>
    Observable<Model[]>;

}
