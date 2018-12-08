import { Injectable, Injector } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { OrganisationControllerService } from '../../api/services/organisation-controller.service';
import { ActivityModel } from '../activity/activity.model';
import { AddressModel } from '../address/address.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { ProviderModel } from '../provider/provider.model';
import { UserModel } from '../user/user.model';

@Injectable({ providedIn: 'root' })
export class OrganisationProvider
  extends CrudProvider<OrganisationControllerService, OrganisationModel> {

  protected linked = [
    {
      field: 'activities',
      method: this.service.organisationControllerFindActivitiesResponse,
      model: ActivityModel
    },
    {
      field: 'address',
      method: this.service.organisationControllerFindAddressResponse,
      model: AddressModel
    },
    {
      field: 'provider',
      method: null,
      model: ProviderModel
    },
    {
      field: 'users',
      method: this.service.organisationControllerFindUsersResponse,
      model: UserModel
    }
  ];

  protected methods = {
    create: this.service.organisationControllerCreateResponse,
    delete: this.service.organisationControllerDeleteResponse,
    findAll: this.service.organisationControllerReadAllResponse,
    findOne: this.service.organisationControllerReadOneResponse,
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

  public findOne: (id: string) => Promise<OrganisationModel>;

  public findAll: (params?: OrganisationControllerService
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
