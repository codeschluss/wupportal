import { Injectable, Type } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { BooleanPrimitive as Boolean } from '../../api/models/boolean-primitive';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { OrganisationControllerService as Service } from '../../api/services/organisation-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { ActivityModel } from '../models/activity.model';
import { AddressModel } from '../models/address.model';
import { ImageModel } from '../models/image.model';
import { LanguageModel } from '../models/language.model';
import { MembershipModel } from '../models/membership.model';
import { OrganisationModel as Model } from '../models/organisation.model';
import { UserModel } from '../models/user.model';
import { VideoModel } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})

export class OrganisationProvider
  extends CrudProvider<Service, Model> {

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
      field: 'translatables',
      method: () => EMPTY,
      model: Model
    },
    {
      field: 'translations',
      method: this.service.organisationControllerReadTranslationsResponse,
      model: Model
    },
    {
      field: 'users',
      method: this.service.organisationControllerReadUsersResponse,
      model: UserModel
    },
    {
      field: 'videos',
      method: this.service.organisationControllerReadVideosResponse,
      model: VideoModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.organisationControllerCreateResponse,
    delete: this.service.organisationControllerDeleteResponse,
    readAll: this.service.organisationControllerReadAllResponse,
    readOne: this.service.organisationControllerReadOneResponse,
    update: this.service.organisationControllerUpdateResponse
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

  public readAll: (params?: Service.OrganisationControllerReadAllParams) =>
    Observable<Model[]>;

  public grantMembership: (id: string, userId: string, grant: Boolean) =>
    Observable<any> = this.apply(this.service
      .organisationControllerApproveOrRejectUserResponse);

  public grantOrganisation: (id: string, grant: Boolean) =>
    Observable<any> = this.apply(this.service
      .organisationControllerGrantApprovalResponse);

  public grantOwnership: (id: string, userId: string, grant: Boolean) =>
    Observable<any> = this.apply(this.service
      .organisationControllerGrantAdminRightResponse);

  public like: (id: string, subscriptionId?: String) =>
    Observable<any> = this.apply(this.service
      .organisationControllerIncreaseLikeResponse);

  public pasteImages: (id: string, images: ImageModel[]) =>
    Observable<any> = this.apply(this.service
      .organisationControllerAddImageResponse);

  public pasteVideos: (id: string, videos: VideoModel[]) =>
    Observable<any> = this.apply(this.service
      .organisationControllerAddVideosResponse);

  public relinkAddress: (id: string, addressId: String) =>
    Observable<any> = this.apply(this.service
      .organisationControllerUpdateAddressResponse);

  public unlinkActivity: (id: string, activityId: string) =>
    Observable<any> = this.apply(this.service
      .organisationControllerDeleteActivityResponse);

  public unlinkImages: (id: string, imageIds: string[]) =>
    Observable<any> = this.apply(this.service
      .organisationControllerDeleteImagesResponse);

  public unlinkUser: (id: string, userId: string) =>
    Observable<any> = this.apply(this.service
      .organisationControllerDeleteUserResponse);

  public unlinkVideos: (id: string, videoIds: string[]) =>
    Observable<any> = this.apply(this.service
      .organisationControllerDeleteVideosResponse);

}
