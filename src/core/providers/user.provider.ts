import { Injectable, Injector } from '@angular/core';
import { UserControllerService } from '../api/services/user-controller.service';
import { CrudProvider } from '../crud/crud.provider';
import { ActivityModel } from '../models/activity.model';
import { OrganisationModel } from '../models/organisation.model';
import { ProviderModel } from '../models/provider.model';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserProvider
  extends CrudProvider<UserControllerService, UserModel> {

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
    },
    {
      field: 'provider',
      method: null,
      model: ProviderModel
    }
  ];

  protected methods = {
    create: this.service.userControllerAddResponse,
    delete: this.service.userControllerDeleteResponse,
    findAll: this.service.userControllerFindAllResponse,
    findOne: this.service.userControllerFindOneResponse,
    update: this.service.userControllerUpdateResponse
  };

  protected model = this.based(UserModel);

  public constructor(
    protected injector: Injector,
    protected service: UserControllerService
  ) {
    super();
  }

  public create: (model: UserModel) => Promise<any>;

  public update: (id: string, model: UserModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public findOne: (id: string) => Promise<UserModel>;

  public findAll: (params?: UserControllerService
    .UserControllerFindAllParams) => Promise<UserModel[]>;

  public linkOrganisations:
    (id: string, organisationIds: string[]) => Promise<any> =
      this.apply(this.service.userControllerAddOrganisationResponse);

  public unlinkActivity:
    (id: string, activityId: string) => Promise<any> =
      this.apply(this.service.userControllerDeleteActivityResponse);

  public unlinkOrganisation:
    (id: string, organisationId) => Promise<any> =
      this.apply(this.service.userControllerDeleteOrganisationResponse);

}
