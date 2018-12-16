import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@portal/core';
import { empty, Observable } from 'rxjs';
import { OrganisationControllerService } from '../../api/services/organisation-controller.service';
import { ActivityModel } from '../activity/activity.model';
import { AddressModel } from '../address/address.model';
import { ImageModel } from '../image/image.model';
import { ProviderModel } from '../provider/provider.model';
import { UserModel } from '../user/user.model';
import { OrganisationModel } from './organisation.model';

@Injectable({ providedIn: 'root' })
export class OrganisationProvider
  extends CrudProvider<OrganisationControllerService, OrganisationModel> {

  protected linked: CrudLink[] = [
    {
      field: 'activities',
      method: this.service.organisationControllerReadActivitiesResponse,
      model: ActivityModel
    },
    {
      field: 'address',
      method: this.service.organisationControllerReadAddressResponse,
      model: AddressModel
    },
    {
      field: 'images',
      method: this.service.organisationControllerReadImagesResponse,
      model: ImageModel
    },
    {
      field: 'providers',
      method: () => empty(),
      model: ProviderModel
    },
    {
      field: 'users',
      method: this.service.organisationControllerReadUsersResponse,
      model: UserModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.organisationControllerCreateResponse,
    delete: this.service.organisationControllerDeleteResponse,
    readAll: this.service.organisationControllerReadAllResponse,
    readOne: this.service.organisationControllerReadOneResponse,
    translate: this.service.organisationControllerReadTranslationsResponse,
    update: this.service.organisationControllerUpdateResponse
  };

  protected model: Type<OrganisationModel> = this.based(OrganisationModel);

  public constructor(
    protected service: OrganisationControllerService
  ) {
    super();
  }

  public create: (model: OrganisationModel) => Observable<any>;

  public update: (id: string, model: OrganisationModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<OrganisationModel>;

  public readAll: (params?: OrganisationControllerService
    .OrganisationControllerReadAllParams) => Observable<OrganisationModel[]>;

  public grantOrganisationAdmin:
    (id: string, userId: string, grant: boolean) => Observable<any> =
      this.apply(this.service.organisationControllerGrantAdminRightResponse);

  public grantOrganisationUser:
    (id: string, userId: string, grant: boolean) => Observable<any> =
    this.apply(this.service.organisationControllerApproveOrRejectUserResponse);

  public relinkAddress:
    (id: string, addressId: string) => Observable<any> =
      this.apply(this.service.organisationControllerUpdateAddressResponse);

  public unlinkActivity:
    (id: string, activityId: string) => Observable<any> =
      this.apply(this.service.organisationControllerDeleteActivityResponse);

  public unlinkUser:
    (id: string, userId: string) => Observable<any> =
      this.apply(this.service.organisationControllerDeleteUserResponse);

}
