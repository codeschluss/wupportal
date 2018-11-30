import { Injectable, Injector } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { CategoryControllerService } from '../../api/services/category-controller.service';
import { CategoryModel } from '../category/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryProvider
  extends CrudProvider<CategoryControllerService, CategoryModel> {

  public create: (model: CategoryModel) => Promise<any>;

  public update: (id: string, model: CategoryModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public findOne: (id: string) => Promise<CategoryModel>;

  public findAll: (params?: CategoryControllerService
    .CategoryControllerFindAllParams) => Promise<CategoryModel[]>;

  protected linked = [];

  protected methods = {
    create: this.service.categoryControllerAddResponse,
    delete: this.service.categoryControllerDeleteResponse,
    findAll: this.service.categoryControllerFindAllResponse,
    findOne: this.service.categoryControllerFindOneResponse,
    update: this.service.categoryControllerUpdateResponse
  };

  protected model = this.based(CategoryModel);

  public constructor(
    protected injector: Injector,
    protected service: CategoryControllerService
  ) {
    super();
  }

}
