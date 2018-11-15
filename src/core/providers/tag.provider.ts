import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TagControllerService } from '../api/services/tag-controller.service';
import { TagModel } from '../models/tag.model';
import { AbstractProvider } from './abstract.provider';

@Injectable({ providedIn: 'root' })
export class TagProvider
  extends AbstractProvider<TagControllerService, TagModel> {

  protected mapping = {
    findAll: this.service.tagControllerFindAllResponse,
    findOne: this.service.tagControllerFindOneResponse,
    add: this.service.tagControllerAddResponse,
    update: this.service.tagControllerUpdateResponse,
    delete: this.service.tagControllerDeleteResponse
  };

  protected model = TagModel;

  public constructor(
    protected service: TagControllerService,
    protected snackbar: MatSnackBar
  ) {
    super();
  }

}
