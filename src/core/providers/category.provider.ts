import { Injectable, Type } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { CategoryControllerService as Service } from '../../api/services/category-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { ActivityModel } from '../models/activity.model';
import { CategoryModel as Model } from '../models/category.model';
import { LanguageModel } from '../models/language.model';

@Injectable({
  providedIn: 'root'
})

export class CategoryProvider
  extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [
    {
      field: 'activities',
      method: () => EMPTY,
      model: ActivityModel
    },
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
      method: this.service.categoryControllerReadTranslationsResponse,
      model: Model
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.categoryControllerCreateResponse,
    delete: this.service.categoryControllerDeleteResponse,
    readAll: this.service.categoryControllerReadAllResponse,
    readOne: this.service.categoryControllerReadOneResponse,
    update: this.service.categoryControllerUpdateResponse
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

  public readAll: (params?: Service.CategoryControllerReadAllParams) =>
    Observable<Model[]>;

}
