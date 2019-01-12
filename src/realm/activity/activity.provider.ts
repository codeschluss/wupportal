import { Injectable, Type } from '@angular/core';
import { CrudLink, CrudMethods, CrudProvider } from '@portal/core';
import { empty, Observable } from 'rxjs';
import { StringPrimitive } from '../../api/models/string-primitive';
import { ActivityControllerService } from '../../api/services/activity-controller.service';
import { AddressModel } from '../address/address.model';
import { BlogModel } from '../blog/blog.model';
import { CategoryModel } from '../category/category.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { ProviderModel } from '../provider/provider.model';
import { ScheduleModel } from '../schedule/schedule.model';
import { TagModel } from '../tag/tag.model';
import { TargetGroupModel } from '../target-group/target-group.model';
import { ActivityModel } from './activity.model';

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
      field: 'category',
      method: this.service.activityControllerReadCategoryResponse,
      model: CategoryModel
    },
    {
      field: 'organisation',
      method: this.service.activityControllerReadOrganisationResponse,
      model: OrganisationModel
    },
    {
      field: 'provider',
      method: () => empty(),
      model: ProviderModel
    },
    {
      field: 'schedules',
      method: this.service.activityControllerReadSchedulesResponse,
      model: ScheduleModel
    },
    {
      field: 'tags',
      method: this.service.activityControllerReadTagsResponse,
      model: TagModel
    },
    {
      field: 'targetGroups',
      method: this.service.activityControllerReadTargetGroupsResponse,
      model: TargetGroupModel
    },
    {
      field: 'blogs',
      method: this.service.activityControllerReadBlogsResponse,
      model: BlogModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.activityControllerCreateResponse,
    delete: this.service.activityControllerDeleteResponse,
    readAll: this.service.activityControllerReadAllResponse,
    readOne: this.service.activityControllerReadOneResponse,
    translate: this.service.activityControllerReadTranslationsResponse,
    update: this.service.activityControllerUpdateResponse
  };

  protected model: Type<ActivityModel> = this.based(ActivityModel);

  public constructor(
    protected service: ActivityControllerService
  ) {
    super();
  }

  public create: (model: ActivityModel) => Observable<any>;

  public update: (model: ActivityModel, id: string) => Observable<any>;

  public delete: (id: string) => Observable<any>;

  public readOne: (id: string) => Observable<ActivityModel>;

  public readAll: (params?: ActivityControllerService
    .ActivityControllerReadAllParams) => Observable<ActivityModel[]>;

  public linkTargetGroups:
    (id: string, targetGroupIds: string[]) => Observable<any> =
      this.apply(this.service.activityControllerAddTargetGroupsResponse);

  public pasteSchedules:
    (id: string, schedules: ScheduleModel[]) => Observable<any> =
      this.apply(this.service.activityControllerAddSchedulesResponse);

  public pasteTags:
    (id: string, tags: TagModel[]) => Observable<any> =
      this.apply(this.service.activityControllerAddTagsResponse);

  public relinkAddress:
    (id: string, addressId: StringPrimitive) => Observable<any> =
      this.apply(this.service.activityControllerUpdateAddressResponse);

  public relinkCategory:
    (id: string, categoryId: StringPrimitive) => Observable<any> =
      this.apply(this.service.activityControllerUpdateCategoryResponse);

  public relinkOrganisation:
    (id: string, organisationId: StringPrimitive) => Observable<any> =
      this.apply(this.service.activityControllerUpdateOrganisationResponse);

  public unlinkSchedules:
    (id: string, scheduleId: string[]) => Observable<any> =
      this.apply(this.service.activityControllerDeleteSchedulesResponse);

  public unlinkTags:
    (id: string, tagIds: string[]) => Observable<any> =
      this.apply(this.service.activityControllerDeleteTagsResponse);

  public unlinkTargetGroups:
    (id: string, targetGroupIds: string[]) => Observable<any> =
      this.apply(this.service.activityControllerDeleteTargetGroupsResponse);

}
