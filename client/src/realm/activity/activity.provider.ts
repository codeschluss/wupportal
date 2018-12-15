import { Injectable } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { Observable } from 'rxjs';
import { ActivityControllerService } from '../../api/services/activity-controller.service';
import { AddressModel } from '../address/address.model';
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

  protected linked = [
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
      method: null,
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
    }
  ];

  protected methods = {
    create: this.service.activityControllerCreateResponse,
    delete: this.service.activityControllerDeleteResponse,
    readAll: this.service.activityControllerReadAllResponse,
    readOne: this.service.activityControllerReadOneResponse,
    translate: this.service.activityControllerReadTranslationsResponse,
    update: this.service.activityControllerUpdateResponse
  };

  protected model = this.based(ActivityModel);

  public constructor(
    protected service: ActivityControllerService
  ) {
    super();
  }

  public create: (model: ActivityModel) => Observable<any>;

  public update: (id: string, model: ActivityModel) => Observable<any>;

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
    (id: string, addressId: string) => Observable<any> =
      this.apply(this.service.activityControllerUpdateAddressResponse);

  public relinkCategory:
    (id: string, categoryId: string) => Observable<any> =
      this.apply(this.service.activityControllerUpdateCategoryResponse);

  public relinkOrganisation:
    (id: string, organisationId: string) => Observable<any> =
      this.apply(this.service.activityControllerUpdateOrganisationResponse);

  public unlinkSchedule:
    (id: string, scheduleId: string) => Observable<any> =
      this.apply(this.service.activityControllerDeleteSchedulesResponse);

  public unlinkTag:
    (id: string, tagId: string) => Observable<any> =
      this.apply(this.service.activityControllerDeleteTagsResponse);

  public unlinkTargetGroup:
    (id: string, targetGroupId: string) => Observable<any> =
      this.apply(this.service.activityControllerDeleteTargetGroupsResponse);

}
