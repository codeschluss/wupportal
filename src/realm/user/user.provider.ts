import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@portal/core';
import { empty, Observable } from 'rxjs';
import { BooleanPrimitive } from '../../api/models/boolean-primitive';
import { StringPrimitive } from '../../api/models/string-primitive';
import { UserControllerService } from '../../api/services/user-controller.service';
import { ActivityModel } from '../activity/activity.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { ProviderModel } from '../provider/provider.model';
import { UserModel } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserProvider
  extends CrudProvider<UserControllerService, UserModel> {

  protected linked: CrudLink[] = [
    {
      field: 'activities',
      method: this.service.userControllerReadActivitiesResponse,
      model: ActivityModel
    },
    {
      field: 'organisations',
      method: this.service.userControllerReadOrganisationsResponse,
      model: OrganisationModel
    },
    {
      field: 'provider',
      method: () => empty(),
      model: ProviderModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.userControllerCreateResponse,
    delete: this.service.userControllerDeleteResponse,
    readAll: this.service.userControllerReadAllResponse,
    readOne: this.service.userControllerReadOneResponse,
    update: this.service.userControllerUpdateResponse
  };

  protected model: Type<UserModel> = this.based(UserModel);

  public constructor(
    protected service: UserControllerService
  ) {
    super();
  }

  public create: (model: UserModel) => Observable<any>;

  public update: (model: UserModel, id: string) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<UserModel>;

  public readAll: (params?: UserControllerService
    .UserControllerReadAllParams) => Observable<UserModel[]>;

  public grantSuperUser:
    (id: string, grant: BooleanPrimitive) => Observable<any> =
      this.apply(this.service.userControllerGrantSuperuserRightResponse);

  public resetPassword:
    (username: StringPrimitive) => Observable<any> =
      this.apply(this.service.userControllerResetPasswordResponse);

  public linkOrganisations:
    (id: string, organisationIds: string[]) => Observable<any> =
      this.apply(this.service.userControllerAddOrganisationResponse);

  public unlinkActivity:
    (id: string, activityId: string) => Observable<any> =
      this.apply(this.service.userControllerDeleteActivityResponse);

  public unlinkOrganisation:
    (id: string, organisationId) => Observable<any> =
      this.apply(this.service.userControllerDeleteOrganisationResponse);

}
