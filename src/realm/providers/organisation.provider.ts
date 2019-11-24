import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@wooportal/core';
import { EMPTY, Observable } from 'rxjs';
import { BooleanPrimitive as Boolean } from '../../api/models/boolean-primitive';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { OrganisationControllerService } from '../../api/services/organisation-controller.service';
import { ActivityModel } from '../models/activity.model';
import { AddressModel } from '../models/address.model';
import { ImageModel } from '../models/image.model';
import { LanguageModel } from '../models/language.model';
import { MembershipModel } from '../models/membership.model';
import { OrganisationModel } from '../models/organisation.model';
import { UserModel } from '../models/user.model';

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
      field: 'language',
      method: () => EMPTY,
      model: LanguageModel
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
    },
    {
      field: 'translations',
      method: this.service.organisationControllerReadTranslationsResponse,
      model: OrganisationModel
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
    update: this.service.organisationControllerUpdateResponse
  };

  protected model: Type<OrganisationModel> = this.based(OrganisationModel);

  public constructor(
    protected service: OrganisationControllerService
  ) {
    super();
  }

  public create: (model: OrganisationModel) => Observable<any>;

  public update: (model: OrganisationModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<OrganisationModel>;

  public readAll: (params?: OrganisationControllerService
    .OrganisationControllerReadAllParams) => Observable<OrganisationModel[]>;

  public grantMembership:
    (id: string, userId: string, grant: Boolean) => Observable<any> =
    this.apply(this.service.organisationControllerApproveOrRejectUserResponse);

  public grantOrganisation:
    (id: string, grant: Boolean) => Observable<any> =
      this.apply(this.service.organisationControllerGrantApprovalResponse);

  public grantOwnership:
    (id: string, userId: string, grant: Boolean) => Observable<any> =
      this.apply(this.service.organisationControllerGrantAdminRightResponse);

  public like:
    (id: string) => Observable<any> =
      this.apply(this.service.organisationControllerIncreaseLikeResponse);

  public pasteImages:
    (id: string, images: ImageModel[]) => Observable<any> =
      this.apply(this.service.organisationControllerAddImageResponse);

  public relinkAddress:
    (id: string, addressId: String) => Observable<any> =
      this.apply(this.service.organisationControllerUpdateAddressResponse);

  public unlinkActivity:
    (id: string, activityId: string) => Observable<any> =
      this.apply(this.service.organisationControllerDeleteActivityResponse);

  public unlinkImages:
    (id: string, imageIds: string[]) => Observable<any> =
      this.apply(this.service.organisationControllerDeleteImagesResponse);

  public unlinkUser:
    (id: string, userId: string) => Observable<any> =
      this.apply(this.service.organisationControllerDeleteUserResponse);

}
