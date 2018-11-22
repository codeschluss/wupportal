import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TagControllerService } from '../api/services/tag-controller.service';
import { CrudService } from '../crud/crud.provider';
import { TagModel } from '../models/tag.model';

@Injectable({ providedIn: 'root' })
export class TagProvider
  extends CrudService<TagControllerService, TagModel> {

  public create: (model: TagModel) => Promise<any>;

  public update: (id: string, model: TagModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public findOne: (id: string) => Promise<TagModel>;

  public findAll: (params?: TagControllerService
    .TagControllerFindAllParams) => Promise<TagModel[]>;

  protected linked = [];

  protected methods = {
    create: this.service.tagControllerAddResponse,
    delete: this.service.tagControllerDeleteResponse,
    findAll: this.service.tagControllerFindAllResponse,
    findOne: this.service.tagControllerFindOneResponse,
    update: this.service.tagControllerUpdateResponse
  };

  protected model = this.based(TagModel);

  public constructor(
    protected injector: Injector,
    protected service: TagControllerService,
    protected snackbar: MatSnackBar
  ) {
    super();
  }

}
