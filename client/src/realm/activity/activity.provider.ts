import { Injectable, Injector } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { ActivityControllerService } from '../../api/services/activity-controller.service';
import { AddressModel } from '../address/address.model';
import { CategoryModel } from '../category/category.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { ScheduleModel } from '../schedule/schedule.model';
import { TagModel } from '../tag/tag.model';
import { TargetGroupModel } from '../target-group/target-group.model';
import { UserModel } from '../user/user.model';
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
      field: 'user',
      method: this.service.activityControllerReadUserResponse,
      model: UserModel
    },
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
    protected injector: Injector,
    protected service: ActivityControllerService
  ) {
    super();
  }

  public create: (model: ActivityModel) => Promise<any>;

  public update: (id: string, model: ActivityModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public readOne: (id: string) => Promise<ActivityModel>;

  public readAll: (params?: ActivityControllerService
    .ActivityControllerReadAllParams) => Promise<ActivityModel[]>;

  public linkTargetGroups:
    (id: string, targetGroupIds: string[]) => Promise<any> =
      this.apply(this.service.activityControllerAddTargetGroupsResponse);

  public pasteSchedules:
    (id: string, schedules: ScheduleModel[]) => Promise<any> =
      this.apply(this.service.activityControllerAddSchedulesResponse);

  public pasteTags:
    (id: string, tags: TagModel[]) => Promise<any> =
      this.apply(this.service.activityControllerAddTagsResponse);

  public relinkAddress:
    (id: string, addressId: string) => Promise<any> =
      this.apply(this.service.activityControllerUpdateAddressResponse);

  public relinkCategory:
    (id: string, categoryId: string) => Promise<any> =
      this.apply(this.service.activityControllerUpdateCategoryResponse);

  public relinkOrganisation:
    (id: string, organisationId: string) => Promise<any> =
      this.apply(this.service.activityControllerUpdateOrganisationResponse);

  public unlinkSchedule:
    (id: string, scheduleId: string) => Promise<any> =
      this.apply(this.service.activityControllerDeleteSchedulesResponse);

  public unlinkTag:
    (id: string, tagId: string) => Promise<any> =
      this.apply(this.service.activityControllerDeleteTagsResponse);

  public unlinkTargetGroup:
    (id: string, targetGroupId: string) => Promise<any> =
      this.apply(this.service.activityControllerDeleteTargetGroupsResponse);

}
