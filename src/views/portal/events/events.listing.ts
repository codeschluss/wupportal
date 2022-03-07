import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { catchError, merge, mergeMap, Observable, of } from 'rxjs';
import { ActivityModel, ActivityProvider, CategoryModel, CrudJoiner, CrudResolver, RoutingComponent } from '../../../core';

@Component({
  styleUrls: ['events.listing.sass'],
  templateUrl: 'events.listing.html'
})

export class EventsListingComponent
  extends RoutingComponent
  implements OnInit {

  public activities: Observable<ActivityModel[]>;

  public get category(): CategoryModel {
    const category = this.route.snapshot.data.categories?.find((item) => {
      return item.id === this.route.snapshot.params.categoryId;
    });

    if (!category) this.router.navigate(['/', 'error', 404]);
    return category;
  }

  public get categories(): CategoryModel[] {
    return this.route.snapshot.data.categories || [];
  }

  protected get routing(): Route {
    return {
      path: 'events/:categoryId',
      resolve: {
        categories: CrudResolver
      },
      data: {
        resolve: {
          categories: CrudJoiner.of(CategoryModel)
        }
      }
    };
  }

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityProvider: ActivityProvider,
    private crudResolver: CrudResolver
  ) {
    super();
  }

  public ngOnInit(): void {
    const joiner = CrudJoiner.of(ActivityModel)
      .with('address')
      .with('category')
      .with('titleImage')
      .with('provider').yield('organisation')
      .with('schedules');

    this.activities = merge(
      this.route.params,
      this.route.queryParams
    ).pipe(
      mergeMap(() => this.activityProvider.readAll({
        categories: [this.route.snapshot.params.categoryId],
        embeddings: CrudJoiner.to(joiner.graph),
        page: 0,
        size: 10,
        startDate: this.route.snapshot.queryParams.startDate,
        endDate: this.route.snapshot.queryParams.endDate
      }).pipe(
        mergeMap((items) => this.crudResolver.refine(items, joiner.graph)),
        catchError(() => of([]))
      ))
    ) as Observable<ActivityModel[]>;
  }

}
