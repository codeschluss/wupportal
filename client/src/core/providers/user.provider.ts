import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserControllerService } from '../api/services/user-controller.service';
import { UserModel } from '../models/user.model';
import { AbstractProvider } from './abstract.provider';

@Injectable({ providedIn: 'root' })
export class UserProvider
  extends AbstractProvider<UserControllerService, UserModel> {

  protected mapping = {
    findAll: this.service.userControllerFindAllResponse,
    findOne: this.service.userControllerFindOneResponse,
    add: this.service.userControllerAddResponse,
    update: this.service.userControllerUpdateResponse,
    delete: this.service.userControllerDeleteResponse
  };

  protected model = UserModel;

  public constructor(
    protected service: UserControllerService,
    protected snackbar: MatSnackBar
  ) {
    super();
  }

}
