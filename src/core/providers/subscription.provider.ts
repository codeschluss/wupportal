import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { StringPrimitive as String } from '../../api/models/string-primitive';
import { SubscriptionControllerService as Service } from '../../api/services/subscription-controller.service';
import { CrudLink, CrudMethods, CrudProvider } from '../crud/crud.provider';
import { ActivityModel } from '../models/activity.model';
import { BloggerModel } from '../models/blogger.model';
import { OrganisationModel } from '../models/organisation.model';
import { SubscriptionTypeModel } from '../models/subscription-type.model';
import { SubscriptionModel as Model } from '../models/subscription.model';
import { TopicModel } from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})

export class SubscriptionProvider
  extends CrudProvider<Service, Model> {

  protected linked: CrudLink[] = [
    {
      field: 'activities',
      method: this.service
        .subscriptionControllerReadActivitySubscriptionsResponse,
      model: ActivityModel
    },
    {
      field: 'bloggers',
      method: this.service
        .subscriptionControllerReadBloggerSubscriptionsResponse,
      model: BloggerModel
    },
    {
      field: 'organisations',
      method: this.service
        .subscriptionControllerReadOrganisationSubscriptionsResponse,
      model: OrganisationModel
    },
    {
      field: 'topics',
      method: this.service
        .subscriptionControllerReadTopicSubscriptionsResponse,
      model: TopicModel
    },
    {
      field: 'types',
      method: this.service
        .subscriptionControllerReadSubscribedTypesResponse,
      model: SubscriptionTypeModel
    }
  ];

  protected methods: CrudMethods = {
    create: this.service.subscriptionControllerCreateResponse,
    delete: this.service.subscriptionControllerDeleteResponse,
    readAll: this.service.subscriptionControllerReadAllResponse,
    readOne: this.service.subscriptionControllerReadOneResponse,
    update: this.service.subscriptionControllerUpdateResponse
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

  public readAll: (params?: Service.SubscriptionControllerReadAllParams) =>
    Observable<Model[]>;

  public analyticsSubscribtionsAll: () =>
    Observable<any> = this.apply(this.service
      .subscriptionControllerCalculateSubscriptionsResponse);

  public linkActivity: (id: string, activityId: String) =>
    Observable<any> = this.apply(this.service
      .subscriptionControllerAddActivitySubscriptionResponse);

  public linkBlogger: (id: string, bloggerId: String) =>
    Observable<any> = this.apply(this.service
      .subscriptionControllerAddBloggerSubscriptionResponse);

  public linkOrganisation: (id: string, organisationId: String) =>
    Observable<any> = this.apply(this.service
      .subscriptionControllerAddOrganisationSubscriptionResponse);

  public linkTopic: (id: string, topicId: String) =>
    Observable<any> = this.apply(this.service
      .subscriptionControllerAddTopicSubscriptionResponse);

  public linkTypes: (id: string, typeIds: string[]) =>
    Observable<any> = this.apply(this.service
      .subscriptionControllerAddSubscriptionTypeResponse);

  public unlinkActivities: (id: string, activityIds: string[]) =>
    Observable<any> = this.apply(this.service
      .subscriptionControllerDeleteActivitySubscriptionsResponse);

  public unlinkBloggers: (id: string, bloggerIds: string[]) =>
    Observable<any> = this.apply(this.service
      .subscriptionControllerDeleteBloggerSubscriptionsResponse);

  public unlinkOrganisations: (id: string, organisationIds: string[]) =>
    Observable<any> = this.apply(this.service
      .subscriptionControllerDeleteOrganisationSubscriptionsResponse);

  public unlinkTopics: (id: string, topicIds: string[]) =>
    Observable<any> = this.apply(this.service
      .subscriptionControllerDeleteTopicSubscriptionsResponse);

  public unlinkTypes: (id: string, typeIds: string[]) =>
    Observable<any> = this.apply(this.service
      .subscriptionControllerDeleteSubscriptionTypesResponse);

}
