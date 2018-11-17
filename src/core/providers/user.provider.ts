import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserControllerService } from '../api/services/user-controller.service';
import { BaseProvider } from '../base/base.provider';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserProvider
  extends BaseProvider<UserControllerService, UserModel> {

  protected methods = {
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
