import { Injectable, Type } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { ActivityControllerService as Service } from '../../api/services/activity-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { ActivityModel as Model } from '../models/activity.model';
import { AddressModel } from '../models/address.model';
import { CategoryModel } from '../models/category.model';
import { ImageModel } from '../models/image.model';
import { LanguageModel } from '../models/language.model';
import { MembershipModel } from '../models/membership.model';
import { OrganisationModel } from '../models/organisation.model';
import { ScheduleModel } from '../models/schedule.model';
import { TargetGroupModel } from '../models/target-group.model';
import { VisitableModel } from '../models/visitable.model';

@Injectable({
  providedIn: 'root'
})

export class ActivityProvider
  extends CrudProvider<Service, Model> {

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
      field: 'targetGroups',
      method: this.service.activityControllerReadTargetGroupsResponse,
      model: TargetGroupModel
    },
    {
      field: 'titleImage',
      method: this.service.activityControllerReadTitleImageResponse,
      model: ImageModel
    },
    {
      field: 'translatables',
      method: () => EMPTY,
      model: Model
    },
    {
      field: 'translations',
      method: this.service.activityControllerReadTranslationsResponse,
      model: Model
    },
    {
      field: 'visitors',
      method: this.service.activityControllerCalculateVisitorsResponse,
      model: VisitableModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.activityControllerCreateResponse,
    delete: this.service.activityControllerDeleteResponse,
    readAll: this.service.activityControllerReadAllResponse,
    readOne: this.service.activityControllerReadOneResponse,
    update: this.service.activityControllerUpdateResponse
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

  public readAll: (params?: Service.ActivityControllerReadAllParams) =>
    Observable<Model[]>;

  public analyticsPerCategory: (current: boolean) =>
    Observable<any> = this.apply(this.service
      .activityControllerCalculateActivitiesPerCategoryResponse);

  public analyticsPerSuburb: (current: boolean) =>
    Observable<any> = this.apply(this.service
      .activityControllerCalculateActivitiesPerSuburbsResponse);

  public analyticsPerTargetGroup: (current: boolean) =>
    Observable<any> = this.apply(this.service
      .activityControllerCalculateActivitiesPerTargetGroupResponse);

  public analyticsVisitorsAll: () =>
    Observable<any> = this.apply(this.service
      .activityControllerCalculateOverviewVisitsResponse);

  public icalAll: (id: string) =>
    Observable<any> = this.apply(this.service
      .activityControllerGenerateIcalResponse);

  public icalOne: (id: string, scheduleId?: string) =>
    Observable<any> = this.apply(this.service
      .activityControllerGenerateIcalResponse);

  public like: (id: string, subscriptionId?: String) =>
    Observable<any> = this.apply(this.service
      .activityControllerIncreaseLikeResponse);

  public linkTargetGroups: (id: string, targetGroupIds: string[]) =>
    Observable<any> = this.apply(this.service
      .activityControllerAddTargetGroupsResponse);

  public pasteImage: (id: string, image: ImageModel | null) =>
    Observable<any> = this.apply(this.service
      .activityControllerAddTitleImageResponse);

  public pasteImages: (id: string, images: ImageModel[]) =>
    Observable<any> = this.apply(this.service
      .activityControllerAddImageResponse);

  public pasteSchedules: (id: string, schedules: ScheduleModel[]) =>
    Observable<any> = this.apply(this.service
      .activityControllerAddSchedulesResponse);

  public relinkAddress: (id: string, addressId: String) =>
    Observable<any> = this.apply(this.service
      .activityControllerUpdateAddressResponse);

  public relinkCategory: (id: string, categoryId: String) =>
    Observable<any> = this.apply(this.service
      .activityControllerUpdateCategoryResponse);

  public relinkOrganisation: (id: string, organisationId: String) =>
    Observable<any> = this.apply(this.service
      .activityControllerUpdateOrganisationResponse);

  public unlinkImages: (id: string, imageIds: string[]) =>
    Observable<any> = this.apply(this.service
      .activityControllerDeleteImagesResponse);

  public unlinkSchedules: (id: string, scheduleId: string[]) =>
    Observable<any> = this.apply(this.service
      .activityControllerDeleteSchedulesResponse);

  public unlinkTargetGroups: (id: string, targetGroupIds: string[]) =>
    Observable<any> = this.apply(this.service
      .activityControllerDeleteTargetGroupsResponse);

}
