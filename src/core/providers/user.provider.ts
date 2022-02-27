import { Injectable, Type } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { BooleanPrimitive as Boolean } from '../../api/models/boolean-primitive';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { UserControllerService as Service } from '../../api/services/user-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { ActivityModel } from '../models/activity.model';
import { BloggerModel } from '../models/blogger.model';
import { BlogpostModel } from '../models/blogpost.model';
import { ImageModel } from '../models/image.model';
import { MembershipModel } from '../models/membership.model';
import { OrganisationModel } from '../models/organisation.model';
import { UserModel as Model } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserProvider
  extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [
    {
      field: 'activities',
      method: this.service.userControllerReadActivitiesResponse,
      model: ActivityModel
    },
    {
      field: 'avatar',
      method: this.service.userControllerReadAvatarResponse,
      model: ImageModel
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

  protected model: Type<Model> = this.based(Model);

  public constructor(
    protected service: Service
  ) {
    super();
  }

  public create: (model: Partial<Model>) => Observable<any>;

  public update: (model: Partial<Model>) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<Model>;

  public readAll: (params?: Service.UserControllerReadAllParams) =>
    Observable<Model[]>;

  public grantBlogger: (id: string, grant: Boolean) =>
    Observable<any> = this.apply(this.service
      .userControllerGrantBloggerRightResponse);

  public grantSuperUser: (id: string, grant: Boolean) =>
    Observable<any> = this.apply(this.service
      .userControllerGrantSuperuserRightResponse);

  public grantTranslator: (id: string, grant: Boolean) =>
    Observable<any> = this.apply(this.service
      .userControllerGrantTranslatorRightResponse);

  public pasteImage: (id: string, image: ImageModel | null) =>
    Observable<any> = this.apply(this.service
      .userControllerAddAvatarResponse);

  public resetAllPasswords: () =>
    Observable<any> = this.apply(this.service
      .userControllerResetAllPasswordsResponse);

  public resetPassword: (username: String) =>
    Observable<any> = this.apply(this.service
      .userControllerResetPasswordResponse);

  public linkBlogger: () =>
    Observable<any> = this.apply(this.service
      .userControllerApplyAsBloggerResponse);

  public linkOrganisations: (id: string, organisationIds: string[]) =>
    Observable<any> = this.apply(this.service
      .userControllerAddOrganisationResponse);

  public unlinkActivity: (id: string, activityId: string) =>
    Observable<any> = this.apply(this.service
      .userControllerDeleteActivityResponse);

  public unlinkBlogpost: (id: string, blogId: string) =>
    Observable<any> = this.apply(this.service
      .userControllerDeleteBlogResponse);

  public unlinkBlogger: (id: string) =>
    Observable<any> = this.apply(this.service
      .userControllerDeleteBloggerResponse);

  public unlinkOrganisation: (id: string, organisationId: string) =>
    Observable<any> = this.apply(this.service
      .userControllerDeleteOrganisationResponse);

}
