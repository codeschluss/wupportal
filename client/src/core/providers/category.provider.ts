import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CategoryControllerService } from '../api/services/category-controller.service';
import { CategoryModel } from '../models/category.model';
import { AbstractProvider } from './abstract.provider';

@Injectable({ providedIn: 'root' })
export class CategoryProvider
  extends AbstractProvider<CategoryControllerService, CategoryModel> {

  protected mapping = {
    findAll: this.service.categoryControllerFindAllResponse,
    findOne: this.service.categoryControllerFindOneResponse,
    add: this.service.categoryControllerAddResponse,
    update: this.service.categoryControllerUpdateResponse,
    delete: this.service.categoryControllerDeleteResponse
  };

  protected model = CategoryModel;

  public constructor(
    protected service: CategoryControllerService,
    protected snackbar: MatSnackBar
  ) {
    super();
  }

}
