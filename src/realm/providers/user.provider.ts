import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@wooportal/core';
import { EMPTY, Observable } from 'rxjs';
import { BooleanPrimitive as Boolean } from '../../api/models/boolean-primitive';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { UserControllerService } from '../../api/services/user-controller.service';
import { ActivityModel } from '../models/activity.model';
import { BloggerModel } from '../models/blogger.model';
import { BlogpostModel } from '../models/blogpost.model';
import { MembershipModel } from '../models/membership.model';
import { OrganisationModel } from '../models/organisation.model';
import { UserModel } from '../models/user.model';

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
      field: 'blogger',
      method: this.service.userControllerReadBloggerResponse,
      model: BloggerModel
    },
    {
      field: 'blogs',
      method: this.service.userControllerReadBlogsResponse,
      model: BlogpostModel
    },
    {
      field: 'organisations',
      method: this.service.userControllerReadOrganisationsResponse,
      model: OrganisationModel
    },
    {
      field: 'provider',
      method: () => EMPTY,
      model: MembershipModel
    },
    {
      field: 'providers',
      method: () => EMPTY,
      model: MembershipModel
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

  public update: (model: UserModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<UserModel>;

  public readAll: (params?: UserControllerService
    .UserControllerReadAllParams) => Observable<UserModel[]>;

  public grantBlogger:
    (id: string, grant: Boolean) => Observable<any> =
      this.apply(this.service.userControllerGrantBloggerRightResponse);

  public grantSuperUser:
    (id: string, grant: Boolean) => Observable<any> =
      this.apply(this.service.userControllerGrantSuperuserRightResponse);

  public resetAllPasswords:
    () => Observable<any> =
      this.apply(this.service.userControllerResetAllPasswordsResponse);

  public resetPassword:
    (username: String) => Observable<any> =
      this.apply(this.service.userControllerResetPasswordResponse);

  public linkBlogger:
    () => Observable<any> =
      this.apply(this.service.userControllerApplyAsBloggerResponse);

  public linkOrganisations:
    (id: string, organisationIds: string[]) => Observable<any> =
      this.apply(this.service.userControllerAddOrganisationResponse);

  public unlinkActivity:
    (id: string, activityId: string) => Observable<any> =
      this.apply(this.service.userControllerDeleteActivityResponse);

  public unlinkBlogpost:
      (id: string, blogId: string) => Observable<any> =
        this.apply(this.service.userControllerDeleteBlogResponse);

  public unlinkBlogger:
      (id: string) => Observable<any> =
        this.apply(this.service.userControllerDeleteBloggerResponse);

  public unlinkOrganisation:
    (id: string, organisationId: string) => Observable<any> =
      this.apply(this.service.userControllerDeleteOrganisationResponse);

}
