import { Injectable, Injector } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { OrganisationControllerService } from '../../api/services/organisation-controller.service';
import { ActivityModel } from '../activity/activity.model';
import { AddressModel } from '../address/address.model';
import { OrganisationImageModel } from '../image/organisation-image.model';
import { ProviderModel } from '../provider/provider.model';
import { UserModel } from '../user/user.model';
import { OrganisationModel } from './organisation.model';

@Injectable({ providedIn: 'root' })
export class OrganisationProvider
  extends CrudProvider<OrganisationControllerService, OrganisationModel> {

  protected linked = [
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
      model: OrganisationImageModel
    },
    {
      field: 'provider',
      method: null,
      model: ProviderModel
    },
    {
      field: 'users',
      method: this.service.organisationControllerReadUsersResponse,
      model: UserModel
    }
  ];

  protected methods = {
    create: this.service.organisationControllerCreateResponse,
    delete: this.service.organisationControllerDeleteResponse,
    readAll: this.service.organisationControllerReadAllResponse,
    readOne: this.service.organisationControllerReadOneResponse,
    translate: this.service.organisationControllerReadTranslationsResponse,
    update: this.service.organisationControllerUpdateResponse
  };

  protected model = this.based(OrganisationModel);

  public constructor(
    protected injector: Injector,
    protected service: OrganisationControllerService
  ) {
    super();
  }

  public create: (model: OrganisationModel) => Promise<any>;

  public update: (id: string, model: OrganisationModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public readOne: (id: string) => Promise<OrganisationModel>;

  public readAll: (params?: OrganisationControllerService
    .OrganisationControllerReadAllParams) => Promise<OrganisationModel[]>;

  public grantOrganisationAdmin:
    (organisationId: string, userId: string, grant: boolean) => Promise<any> =
      this.apply(this.service.organisationControllerGrantAdminRightResponse);

  public grantOrganisationUser:
    (organisationId: string, userId: string, grant: boolean) => Promise<any> =
    this.apply(this.service.organisationControllerApproveOrRejectUserResponse);

  public relinkAddress:
    (id: string, addressId: string) => Promise<any> =
      this.apply(this.service.organisationControllerUpdateAddressResponse);

  public unlinkActivity:
    (id: string, activityId: string) => Promise<any> =
      this.apply(this.service.organisationControllerDeleteActivityResponse);

  public unlinkUser:
    (id: string, userId: string) => Promise<any> =
      this.apply(this.service.organisationControllerDeleteUserResponse);

}
