import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ActivityModel, CategoryModel, CrudJoiner, CrudResolver, OrganisationModel, RoutingComponent } from '../../../core';

@Component({
  styleUrls: ['events.component.sass'],
  templateUrl: 'events.component.html'
})

export class EventsComponent
  extends RoutingComponent {

  public get activities(): ActivityModel[] {
    return this.route.snapshot.data.activities || [];
  }

  public get categories(): CategoryModel[] {
    return this.route.snapshot.data.categories?.map((category) => {
      category.activities = category.activities.map((activity) => {
        activity.category = category;
        return activity;
      });

      return category;
    }) || [];
  }

  public get organisations(): OrganisationModel[] {
    return this.route.snapshot.data.organisations || [];
  }

  protected get routing(): Route {
    return {
      path: 'events',
      resolve: {
        activities: CrudResolver,
        categories: CrudResolver
      },
      data: {
        resolve: {
          activities: CrudJoiner.of(ActivityModel, {
            current: true,
            page: 0,
            size: 4
          })
            .with('address')
            .with('category')
            .with('provider').yield('organisation')
            .with('schedules')
            .with('titleImage'),
          categories: CrudJoiner.of(CategoryModel, {
            page: 0,
            size: 5,
            sort: 'activities.likes'
          })
            .with('activities').yield('address')
            .with('activities').yield('provider').yield('organisation')
            .with('activities').yield('schedules')
            .with('activities').yield('titleImage')
        }
      }
    };
  }

  public constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

}
