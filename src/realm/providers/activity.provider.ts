import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@wooportal/core';
import { EMPTY, Observable } from 'rxjs';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { ActivityControllerService } from '../../api/services/activity-controller.service';
import { ActivityModel } from '../models/activity.model';
import { AddressModel } from '../models/address.model';
import { BlogpostModel } from '../models/blogpost.model';
import { CategoryModel } from '../models/category.model';
import { ImageModel } from '../models/image.model';
import { KeywordModel } from '../models/keyword.model';
import { LanguageModel } from '../models/language.model';
import { MembershipModel } from '../models/membership.model';
import { OrganisationModel } from '../models/organisation.model';
import { ScheduleModel } from '../models/schedule.model';
import { TargetGroupModel } from '../models/target-group.model';

@Injectable({ providedIn: 'root' })
export class ActivityProvider
  extends CrudProvider<ActivityControllerService, ActivityModel> {

  protected linked: CrudLink[] = [
    {
      field: 'address',
      method: this.service.activityControllerReadAddressResponse,
      model: AddressModel
    },
    {
      field: 'blogs',
      method: this.service.activityControllerReadBlogsResponse,
      model: BlogpostModel
    },
    {
      field: 'category',
      method: this.service.activityControllerReadCategoryResponse,
      model: CategoryModel
    },
    {
      field: 'images',
      method: this.service.activityControllerReadImagesResponse,
      model: ImageModel
    },
    {
      field: 'language',
      method: () => EMPTY,
      model: LanguageModel
    },
    {
      field: 'organisation',
      method: this.service.activityControllerReadOrganisationResponse,
      model: OrganisationModel
    },
    {
      field: 'provider',
      method: () => EMPTY,
      model: MembershipModel
    },
    {
      field: 'schedules',
      method: this.service.activityControllerReadSchedulesResponse,
      model: ScheduleModel
    },
    {
      field: 'tags',
      method: this.service.activityControllerReadTagsResponse,
      model: KeywordModel
    },
    {
      field: 'targetGroups',
      method: this.service.activityControllerReadTargetGroupsResponse,
      model: TargetGroupModel
    },
    {
      field: 'translations',
      method: this.service.activityControllerReadTranslationsResponse,
      model: ActivityModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.activityControllerCreateResponse,
    delete: this.service.activityControllerDeleteResponse,
    readAll: this.service.activityControllerReadAllResponse,
    readOne: this.service.activityControllerReadOneResponse,
    update: this.service.activityControllerUpdateResponse
  };

  protected model: Type<ActivityModel> = this.based(ActivityModel);

  public constructor(
    protected service: ActivityControllerService
  ) {
    super();
  }

  public create: (model: ActivityModel) => Observable<any>;

  public update: (model: ActivityModel) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<ActivityModel>;

  public readAll: (params?: ActivityControllerService
    .ActivityControllerReadAllParams) => Observable<ActivityModel[]>;

  public like:
    (id: string) => Observable<any> =
      this.apply(this.service.activityControllerIncreaseLikeResponse);

  public linkTargetGroups:
    (id: string, targetGroupIds: string[]) => Observable<any> =
      this.apply(this.service.activityControllerAddTargetGroupsResponse);

  public pasteImages:
    (id: string, images: ImageModel[]) => Observable<any> =
      this.apply(this.service.activityControllerAddImageResponse);

  public pasteKeywords:
    (id: string, tags: KeywordModel[]) => Observable<any> =
      this.apply(this.service.activityControllerAddTagsResponse);

  public pasteSchedules:
    (id: string, schedules: ScheduleModel[]) => Observable<any> =
      this.apply(this.service.activityControllerAddSchedulesResponse);

  public relinkAddress:
    (id: string, addressId: String) => Observable<any> =
      this.apply(this.service.activityControllerUpdateAddressResponse);

  public relinkCategory:
    (id: string, categoryId: String) => Observable<any> =
      this.apply(this.service.activityControllerUpdateCategoryResponse);

  public relinkOrganisation:
    (id: string, organisationId: String) => Observable<any> =
      this.apply(this.service.activityControllerUpdateOrganisationResponse);

  public unlinkImages:
    (id: string, imageIds: string[]) => Observable<any> =
      this.apply(this.service.activityControllerDeleteImagesResponse);

  public unlinkKeywords:
    (id: string, tagIds: string[]) => Observable<any> =
      this.apply(this.service.activityControllerDeleteTagsResponse);

  public unlinkSchedules:
    (id: string, scheduleId: string[]) => Observable<any> =
      this.apply(this.service.activityControllerDeleteSchedulesResponse);

  public unlinkTargetGroups:
    (id: string, targetGroupIds: string[]) => Observable<any> =
      this.apply(this.service.activityControllerDeleteTargetGroupsResponse);

}
