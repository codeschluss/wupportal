import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ActivityModel, BloggerModel, CrudJoiner, CrudModel, CrudResolver, OrganisationModel, SessionGuarding, SessionProvider, SubscriptionModel, SubscriptionProvider, SubscriptionTypeModel, TopicModel } from '../../../../core';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.sass', 'notifications.page.sass'],
  templateUrl: 'notifications.page.html'
})

export class NotificationsPageComponent
  extends BasePage {

  protected path: string = 'notifications/:uuid';

  public get items(): {
    activities: ActivityModel[];
    bloggers: BloggerModel[];
    organisations: OrganisationModel[];
    topics: TopicModel[];
    types: SubscriptionTypeModel[];
  } {
    return {
      activities: this.subscription.activities || [],
      bloggers: this.subscription.bloggers || [],
      organisations: this.subscription.organisations || [],
      topics: this.subscription.topics || [],
      types: this.subscription.types || []
    };
  }

  public get subscription(): SubscriptionModel {
    return this.route.snapshot.data.subscription || { };
  }

  public get subscriptionId(): string {
    return this.route.snapshot.data.session.subscriptionId;
  }

  public get types(): SubscriptionTypeModel[] {
    return this.route.snapshot.data.subscriptionTypes || [];
  }

  protected get routing(): Route {
    return {
      path: this.path,
      canActivate: [SessionGuarding],
      resolve: {
        subscription: CrudResolver,
        subscriptionTypes: CrudResolver
      },
      data: {
        resolve: {
          subscription: CrudJoiner.of(SubscriptionModel)
            .with('activities')
            .with('bloggers')
            .with('organisations')
            .with('topics')
            .with('types'),
          subscriptionTypes: CrudJoiner.of(SubscriptionTypeModel, {
            filter: null
          })
        }
      }
    };
  }

  public constructor(
    private route: ActivatedRoute,
    private sessionProvider: SessionProvider,
    private subscriptionProvider: SubscriptionProvider
  ) {
    super();
  }

  public selected(item: SubscriptionTypeModel): boolean {
    return this.items.types.findIndex((type) => type.id === item.id) >= 0;
  }

  public toggle(event: boolean, item: SubscriptionTypeModel): void {
    const method = event
      ? this.subscriptionProvider.linkTypes(this.subscriptionId, [item.id])
      : this.subscriptionProvider.unlinkTypes(this.subscriptionId, [item.id]);

    method.subscribe();
  }

  public unsubscribe(item: CrudModel): void {
    let items; let method; switch (true) {
      case item instanceof ActivityModel:
        items = this.items.activities;
        method = this.subscriptionProvider.unlinkActivities;
        break;

      case item instanceof BloggerModel:
        items = this.items.bloggers;
        method = this.subscriptionProvider.unlinkBloggers;
        break;

      case item instanceof OrganisationModel:
        items = this.items.organisations;
        method = this.subscriptionProvider.unlinkOrganisations;
        break;

      case item instanceof TopicModel:
        items = this.items.topics;
        method = this.subscriptionProvider.unlinkTopics;
        break;
    }

    method(this.subscriptionId, [item.id]).subscribe(() => {
      this.sessionProvider.delFollowed(item.id);
      items.splice(items.indexOf(item), 1);
    });
  }

}
