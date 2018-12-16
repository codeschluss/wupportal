import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@portal/core';
import { Observable } from 'rxjs';
import { CategoryControllerService } from '../../api/services/category-controller.service';
import { CategoryModel } from './category.model';

@Injectable({ providedIn: 'root' })
export class CategoryProvider
  extends CrudProvider<CategoryControllerService, CategoryModel> {

  public create: (model: CategoryModel) => Observable<any>;

  public update: (id: string, model: CategoryModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<CategoryModel>;

  public readAll: (params?: CategoryControllerService
    .CategoryControllerReadAllParams) => Observable<CategoryModel[]>;

  protected linked: CrudLink[] = [];

  protected methods: CrudMethods = {
    create: this.service.categoryControllerCreateResponse,
    delete: this.service.categoryControllerDeleteResponse,
    readAll: this.service.categoryControllerReadAllResponse,
    readOne: this.service.categoryControllerReadOneResponse,
    translate: this.service.categoryControllerReadTranslationsResponse,
    update: this.service.categoryControllerUpdateResponse
  };

  protected model: Type<CategoryModel> = this.based(CategoryModel);

  public constructor(
    protected service: CategoryControllerService
  ) {
    super();
  }

}
