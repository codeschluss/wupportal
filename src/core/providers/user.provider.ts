import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserControllerService } from '../api/services/user-controller.service';
import { BaseProvider } from '../base/base.provider';
import { ActivityModel } from '../models/activity.model';
import { OrganisationModel } from '../models/organisation.model';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserProvider
  extends BaseProvider<UserControllerService, UserModel> {

  protected linked = [
    {
      field: 'activities',
      method: this.service.userControllerFindActivitiesResponse,
      model: ActivityModel
    },
    {
      field: 'organisations',
      method: this.service.userControllerFindOrganisationsResponse,
      model: OrganisationModel
    }
  ];

  protected methods = {
    findAll: this.service.userControllerFindAllResponse,
    findOne: this.service.userControllerFindOneResponse,
    add: this.service.userControllerAddResponse,
    update: this.service.userControllerUpdateResponse,
    delete: this.service.userControllerDeleteResponse
  };

  protected model = this.provide(UserModel);

  public constructor(
    protected injector: Injector,
    protected service: UserControllerService,
    protected snackbar: MatSnackBar
  ) { super(); }

}
