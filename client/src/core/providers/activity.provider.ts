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
    findAll: this.service.activityControllerFindAllResponse,
    findOne: this.service.activityControllerFindOneResponse,
    add: this.service.activityControllerAddResponse,
    update: this.service.activityControllerUpdateResponse,
    delete: this.service.activityControllerDeleteResponse
  };

  protected model = this.provide(ActivityModel);

  public constructor(
    protected injector: Injector,
    protected service: ActivityControllerService,
    protected snackbar: MatSnackBar
  ) { super(); }

}
