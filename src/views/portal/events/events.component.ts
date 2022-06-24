import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { map, mergeMap, Observable } from 'rxjs';
import { ActivityModel, ActivityProvider, CategoryModel, CrudJoiner, CrudResolver, OrganisationModel, RoutingComponent } from '../../../core';

@Component({
  styleUrls: ['events.component.sass'],
  templateUrl: 'events.component.html'
})

export class EventsComponent
  extends RoutingComponent implements OnInit {

  public get activities(): ActivityModel[] {
    return this.route.snapshot.data.activities || [];
  }

  public categories: Observable<CategoryModel[]>;

  public get organisations(): OrganisationModel[] {
    return this.route.snapshot.data.organisations || [];
  }

  protected get routing(): Route {
    return {
      path: 'events',
      resolve: {
        activities: CrudResolver
      },
      data: {
        resolve: {
          activities: CrudJoiner.of(ActivityModel, {
            current: true,
            page: 0,
            size: 4,
            dir: 'desc',
            sort: 'schedules.startDate'
          })
            .with('address')
            .with('category')
            .with('provider').yield('organisation')
            .with('schedules')
            .with('titleImage')
        }
      }
    };
  }

  public constructor(
    private activityProvider: ActivityProvider,
    private crudResolver: CrudResolver,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    const joiner = CrudJoiner.of(ActivityModel)
      .with('address')
      .with('category')
      .with('titleImage')
      .with('provider').yield('organisation')
      .with('schedules');

    this.categories = this.activityProvider.readAll({
      current: true
    }).pipe(
      mergeMap((items) => this.crudResolver.refine(items, joiner.graph)),
      map((activities: ActivityModel[]) => {
        const categories: CategoryModel[] = [];
        activities.forEach(activity => {
          let current = categories.find(c => c.id == activity.category.id);
          if (!current) {
            current = activity.category;
            categories.push(current);
          }
          current.activities = current.activities || [] as ActivityModel[] & Observable<ActivityModel[]>;
          current.activities.push(activity);
        })
        return categories;
      })
    );
  }

}
