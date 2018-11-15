import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SuburbControllerService } from '../api/services/suburb-controller.service';
import { SuburbModel } from '../models/suburb.model';
import { AbstractProvider } from './abstract.provider';

@Injectable({ providedIn: 'root' })
export class SuburbProvider
  extends AbstractProvider<SuburbControllerService, SuburbModel> {

  protected mapping = {
    findAll: this.service.suburbControllerFindAllResponse,
    findOne: this.service.suburbControllerFindOneResponse,
    add: this.service.suburbControllerAddResponse,
    update: this.service.suburbControllerUpdateResponse,
    delete: this.service.suburbControllerDeleteResponse
  };

  protected model = SuburbModel;

  public constructor(
    protected service: SuburbControllerService,
    protected snackbar: MatSnackBar
  ) {
    super();
  }

}
