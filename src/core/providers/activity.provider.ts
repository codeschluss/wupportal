import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivityControllerService } from '../api/services/activity-controller.service';
import { BaseProvider } from '../base/base.provider';
import { ActivityModel } from '../models/activity.model';
import { AddressModel } from '../models/address.model';
import { CategoryModel } from '../models/category.model';
import { OrganisationModel } from '../models/organisation.model';
import { ScheduleModel } from '../models/schedule.model';
import { TagModel } from '../models/tag.model';
import { TargetGroupModel } from '../models/target-group.model';
import { UserModel } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class ActivityProvider
  extends BaseProvider<ActivityControllerService, ActivityModel> {

  public createSchedules:
    (id: string, schedules: ScheduleModel[]) => Promise<any> =
      this.apply(this.service.activityControllerAddSchedulesResponse);

  public createTags:
    (id: string, tags: TagModel[]) => Promise<any> =
      this.apply(this.service.activityControllerAddTagsResponse);

  public createTargetGroups:
    (id: string, targetGroupIds: string[]) => Promise<any> =
      this.apply(this.service.activityControllerAddTargetGroupsResponse);

  public updateAddress:
    (id: string, addressId: string) => Promise<any> =
      this.apply(this.service.activityControllerUpdateAddressResponse);

  public updateCategory:
    (id: string, categoryId: string) => Promise<any> =
      this.apply(this.service.activityControllerUpdateCategoryResponse);

  public updateOrganisation:
    (id: string, organisationId: string) => Promise<any> =
      this.apply(this.service.activityControllerUpdateOrganisationResponse);

  public deleteSchedule:
    (id: string, scheduleId: string) => Promise<any> =
      this.apply(this.service.activityControllerDeleteSchedulesResponse);

  public deleteTags:
    (id: string, organisationId: string) => Promise<any> =
      this.apply(this.service.activityControllerDeleteTagsResponse);

  public deleteTargetGroups:
    (id: string, organisationId: string) => Promise<any> =
      this.apply(this.service.activityControllerDeleteTargetGroupsResponse);

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
    create: this.service.activityControllerAddResponse,
    delete: this.service.activityControllerDeleteResponse,
    findAll: this.service.activityControllerFindAllResponse,
    findOne: this.service.activityControllerFindOneResponse,
    update: this.service.activityControllerUpdateResponse
  };

  protected model = this.based(ActivityModel);

  public constructor(
    protected injector: Injector,
    protected service: ActivityControllerService,
    protected snackbar: MatSnackBar
  ) { super(); }

}
