import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@wooportal/core';
import { EMPTY, Observable } from 'rxjs';
import { CategoryControllerService } from '../../api/services/category-controller.service';
import { CategoryModel } from '../models/category.model';
import { LanguageModel } from '../models/language.model';

@Injectable({ providedIn: 'root' })
export class CategoryProvider
  extends CrudProvider<CategoryControllerService, CategoryModel> {

  public create: (model: CategoryModel) => Observable<any>;

  public update: (model: CategoryModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<CategoryModel>;

  public readAll: (params?: CategoryControllerService
    .CategoryControllerReadAllParams) => Observable<CategoryModel[]>;

  protected linked: CrudLink[] = [
    {
      field: 'language',
      method: () => EMPTY,
      model: LanguageModel
    },
    {
      field: 'translations',
      method: this.service.categoryControllerReadTranslationsResponse,
      model: CategoryModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.categoryControllerCreateResponse,
    delete: this.service.categoryControllerDeleteResponse,
    readAll: this.service.categoryControllerReadAllResponse,
    readOne: this.service.categoryControllerReadOneResponse,
    update: this.service.categoryControllerUpdateResponse
  };

  protected model: Type<CategoryModel> = this.based(CategoryModel);

  public constructor(
    protected service: CategoryControllerService
  ) {
    super();
  }

}
