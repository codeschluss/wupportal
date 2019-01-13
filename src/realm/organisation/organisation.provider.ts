import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@portal/core';
import { empty, Observable } from 'rxjs';
import { BooleanPrimitive as Boolean } from '../../api/models/boolean-primitive';
import { StringPrimitive as String } from '../../api/models/string-primitive';
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
      field: 'provider',
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

  public update: (model: OrganisationModel, id: string) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<OrganisationModel>;

  public readAll: (params?: OrganisationControllerService
    .OrganisationControllerReadAllParams) => Observable<OrganisationModel[]>;

  public grantOrganisation:
    (id: string, grant: Boolean) => Observable<any> =
      this.apply(this.service.organisationControllerGrantApprovalResponse);

  public grantOrganisationAdmin:
    (id: string, userId: String, grant: Boolean) => Observable<any> =
      this.apply(this.service.organisationControllerGrantAdminRightResponse);

  public grantOrganisationUser:
    (id: string, userId: String, grant: Boolean) => Observable<any> =
    this.apply(this.service.organisationControllerApproveOrRejectUserResponse);

  public pasteImages:
    (id: string, images: ImageModel[]) => Observable<any> =
      this.apply(this.service.organisationControllerAddImageResponse);

  public relinkAddress:
    (id: string, addressId: String) => Observable<any> =
      this.apply(this.service.organisationControllerUpdateAddressResponse);

  public unlinkActivity:
    (id: string, activityId: String) => Observable<any> =
      this.apply(this.service.organisationControllerDeleteActivityResponse);

  public unlinkImages:
    (id: string, imageIds: string[]) => Observable<any> =
      this.apply(this.service.organisationControllerDeleteImagesResponse);

  public unlinkUser:
    (id: string, userId: String) => Observable<any> =
      this.apply(this.service.organisationControllerDeleteUserResponse);

}
