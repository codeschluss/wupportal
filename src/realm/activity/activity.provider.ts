import { Injectable, Injector } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { ActivityControllerService } from '../../api/services/activity-controller.service';
import { ActivityModel } from '../activity/activity.model';
import { AddressModel } from '../address/address.model';
import { CategoryModel } from '../category/category.model';
import { OrganisationModel } from '../organisation/organisation.model';
import { ScheduleModel } from '../schedule/schedule.model';
import { TagModel } from '../tag/tag.model';
import { TargetGroupModel } from '../target-group/target-group.model';
import { UserModel } from '../user/user.model';

@Injectable({ providedIn: 'root' })
export class ActivityProvider
  extends CrudProvider<ActivityControllerService, ActivityModel> {

  protected linked = [
    {
      field: 'address',
      method: this.service.activityControllerFindAddressResponse,
      model: AddressModel
    },
    {
      field: 'category',
      method: this.service.activityControllerFindCategoryResponse,
      model: CategoryModel
    },
    {
      field: 'organisation',
      method: this.service.activityControllerFindOrganisationResponse,
      model: OrganisationModel
    },
    {
      field: 'schedules',
      method: this.service.activityControllerFindSchedulesResponse,
      model: ScheduleModel
    },
    {
      field: 'tags',
      method: this.service.activityControllerFindTagsResponse,
      model: TagModel
    },
    {
      field: 'targetGroups',
      method: this.service.activityControllerFindTargetGroupsResponse,
      model: TargetGroupModel
    },
    {
      field: 'user',
      method: this.service.activityControllerFindUserResponse,
      model: UserModel
    },
  ];

  protected methods = {
    create: this.service.activityControllerCreateResponse,
    delete: this.service.activityControllerDeleteResponse,
    findAll: this.service.activityControllerReadAllResponse,
    findOne: this.service.activityControllerReadOneResponse,
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

  public findOne: (id: string) => Promise<ActivityModel>;

  public findAll: (params?: ActivityControllerService
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
