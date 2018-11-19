import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TagControllerService } from '../api/services/tag-controller.service';
import { BaseProvider } from '../base/base.provider';
import { TagModel } from '../models/tag.model';

@Injectable({ providedIn: 'root' })
export class TagProvider
  extends BaseProvider<TagControllerService, TagModel> {

  protected linked = [];

  protected methods = {
    findAll: this.service.tagControllerFindAllResponse,
    findOne: this.service.tagControllerFindOneResponse,
    add: this.service.tagControllerAddResponse,
    update: this.service.tagControllerUpdateResponse,
    delete: this.service.tagControllerDeleteResponse
  };

  protected model = TagModel;

  public constructor(
    protected injector: Injector,
    protected service: TagControllerService,
    protected snackbar: MatSnackBar
  ) { super(); }

}
