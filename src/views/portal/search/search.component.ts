import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { ActivityModel, BlogpostModel, CrudJoiner, CrudModel, CrudProvider, CrudResolver, OrganisationModel, RoutingComponent } from '../../../core';

@Component({
  styleUrls: ['search.component.sass'],
  templateUrl: 'search.component.html'
})

export class SearchComponent
  extends RoutingComponent
  implements OnInit {

  public results: Observable<any>;

  protected get routing(): Route {
    return {
      path: 'search/:filter'
    };
  }

  public constructor(
    private crudResolver: CrudResolver,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.results = this.route.params.pipe(mergeMap(({ filter }) => forkJoin({
      activities: this.search(filter, ActivityModel),
      blogposts: this.search(filter, BlogpostModel),
      organisations: this.search(filter, OrganisationModel)
    })), tap(({ activities, blogposts, organisations }) => {
      if (!activities.length && !blogposts.length && !organisations.length) {
        this.router.navigate(['/', 'error', 404]);
      }
    }));
  }

  private search(filter: string, model: Type<CrudModel>): Observable<any> {
    const provider = (model as any).provider as CrudProvider<any, any>;
    const joiner = CrudJoiner.of(model);

    switch (model) {
      case ActivityModel: joiner
        .with('address')
        .with('category')
        .with('provider').yield('organisation')
        .with('schedules')
        .with('titleImage');
        break;

      case BlogpostModel: joiner
        .with('titleImage');
        break;

      case OrganisationModel: joiner
        .with('avatar');
        break;
    }

    return provider.readAll({
      embeddings: CrudJoiner.to(joiner.graph),
      filter
    }).pipe(
      mergeMap((items) => this.crudResolver.refine(items, joiner.graph)),
      catchError(() => of([]))
    );
  }

}
