import { Component, OnInit, QueryList, Type, ViewChildren } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActivityModel, BaseService, BlogpostModel, CategoryModel, CrudJoiner, CrudModel, CrudProvider, CrudResolver, InfopageModel, OrganisationModel, SuburbModel, TargetGroupModel } from '../../../../core';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.sass', 'search.page.sass'],
  templateUrl: 'search.page.html'
})

export class SearchPageComponent
  extends BasePage
  implements OnInit {

  public items: {
    activities: ActivityModel[];
    blogposts: BlogpostModel[];
    categories: CategoryModel[];
    organisations: OrganisationModel[];
    infopages: InfopageModel[];
    suburbs: SuburbModel[];
    targetGroups: TargetGroupModel[];
  } = {
    activities: [],
    blogposts: [],
    categories: [],
    organisations: [],
    infopages: [],
    suburbs: [],
    targetGroups: []
  };

  public results: number = -1;

  protected path: string = 'search/:filter';

  @ViewChildren(MatExpansionPanel)
  private expands: QueryList<MatExpansionPanel>;

  public constructor(
    public router: Router,
    private crudResolver: CrudResolver,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.route.paramMap.pipe(map((params) => params.get('filter'))).pipe(
      mergeMap((filter) => forkJoin([
        this.search(filter, ActivityModel).pipe(
          map((items) => (this.items.activities = items).length)),
        this.search(filter, BlogpostModel).pipe(
          map((items) => (this.items.blogposts = items).length)),
        this.search(filter, CategoryModel).pipe(
          map((items) => (this.items.categories = items).length)),
        this.search(filter, InfopageModel).pipe(
          map((items) => (this.items.infopages = items).length)),
        this.search(filter, OrganisationModel).pipe(
          map((items) => (this.items.organisations = items).length)),
        this.search(filter, SuburbModel).pipe(
          map((items) => (this.items.suburbs = items).length)),
        this.search(filter, TargetGroupModel).pipe(
          map((items) => (this.items.targetGroups = items).length))
      ]))
    ).subscribe((length) => this.results = length.reduce((num, i) => num + i));
  }

  public expanded(expand: MatExpansionPanel): void {
    if (this.expands.length) {
      this.expands.filter((e) => e !== expand).forEach((e) => e.close());
    }
  }

  private search(filter: string, model: Type<CrudModel>): Observable<any> {
    const joiner = CrudJoiner.of(model);
    const provider = (model as any)
      .provider as CrudProvider<BaseService, CrudModel>;

    switch (model) {
      case ActivityModel:
        joiner
          .with('address').yield('suburb')
          .with('category')
          .with('schedules');
        break;

      case BlogpostModel:
        joiner
          .with('activity');
        break;

      case OrganisationModel:
        joiner
          .with('address').yield('suburb')
          .with('images');
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
