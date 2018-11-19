import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SuburbControllerService } from '../api/services/suburb-controller.service';
import { BaseProvider } from '../base/base.provider';
import { SuburbModel } from '../models/suburb.model';

@Injectable({ providedIn: 'root' })
export class SuburbProvider
  extends BaseProvider<SuburbControllerService, SuburbModel> {

  protected linked = [];

  protected methods = {
    findAll: this.service.suburbControllerFindAllResponse,
    findOne: this.service.suburbControllerFindOneResponse,
    add: this.service.suburbControllerAddResponse,
    update: this.service.suburbControllerUpdateResponse,
    delete: this.service.suburbControllerDeleteResponse
  };

  protected model = this.provide(SuburbModel);

  public constructor(
    protected injector: Injector,
    protected service: SuburbControllerService,
    protected snackbar: MatSnackBar
  ) { super(); }

}
