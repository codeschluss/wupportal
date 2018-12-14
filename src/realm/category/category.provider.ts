import { Injectable } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { CategoryControllerService } from '../../api/services/category-controller.service';
import { CategoryModel } from './category.model';

@Injectable({ providedIn: 'root' })
export class CategoryProvider
  extends CrudProvider<CategoryControllerService, CategoryModel> {

  public create: (model: CategoryModel) => Promise<any>;

  public update: (id: string, model: CategoryModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public readOne: (id: string) => Promise<CategoryModel>;

  public readAll: (params?: CategoryControllerService
    .CategoryControllerReadAllParams) => Promise<CategoryModel[]>;

  protected linked = [];

  protected methods = {
    create: this.service.categoryControllerCreateResponse,
    delete: this.service.categoryControllerDeleteResponse,
    readAll: this.service.categoryControllerReadAllResponse,
    readOne: this.service.categoryControllerReadOneResponse,
    translate: this.service.categoryControllerReadTranslationsResponse,
    update: this.service.categoryControllerUpdateResponse
  };

  protected model = this.based(CategoryModel);

  public constructor(
    protected service: CategoryControllerService
  ) {
    super();
  }

}
