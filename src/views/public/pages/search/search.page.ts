import { Component, OnInit, QueryList, Type, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService, CrudJoiner, CrudModel, CrudProvider, CrudResolver } from '@wooportal/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { BlogModel } from '../../../../realm/models/blog.model';
import { CategoryModel } from '../../../../realm/models/category.model';
import { OrganisationModel } from '../../../../realm/models/organisation.model';
import { PageModel } from '../../../../realm/models/page.model';
import { SuburbModel } from '../../../../realm/models/suburb.model';
import { TargetGroupModel } from '../../../../realm/models/target-group.model';
import { ExpandCompatComponent } from '../../../shared/compat/expand/expand.compat';
import { ExpandCompat } from '../../../shared/compat/expand/expand.compat.i';
import { BasePage } from '../base.page';

@Component({
  styleUrls: ['../base.page.scss', 'search.page.scss'],
  templateUrl: 'search.page.html'
})

export class SearchPageComponent extends BasePage implements OnInit {

  public items: {
    activities: ActivityModel[],
    blogposts: BlogModel[],
    categories: CategoryModel[],
    organisations: OrganisationModel[],
    infopages: PageModel[],
    suburbs: SuburbModel[],
    targetGroups: TargetGroupModel[]
  } = {
    activities: [],
    blogposts: [],
    categories: [],
    organisations: [],
    infopages: [],
    suburbs: [],
    targetGroups: []
  };

  protected path: string = 'search/:filter';

  @ViewChildren(ExpandCompatComponent)
  private expands: QueryList<ExpandCompat>;

  public constructor(
    private crudResolver: CrudResolver,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.route.paramMap.pipe(map((params) => params.get('filter'))).pipe(
      mergeMap((filter) => forkJoin([
        this.search(filter, ActivityModel).pipe(
          map((items) => this.items.activities = items)),
        this.search(filter, BlogModel).pipe(
          map((items) => this.items.blogposts = items)),
        this.search(filter, CategoryModel).pipe(
          map((items) => this.items.categories = items)),
        this.search(filter, OrganisationModel).pipe(
          map((items) => this.items.organisations = items)),
        this.search(filter, PageModel).pipe(
          map((items) => this.items.infopages = items)),
        this.search(filter, SuburbModel).pipe(
          map((items) => this.items.suburbs = items)),
        this.search(filter, TargetGroupModel).pipe(
          map((items) => this.items.targetGroups = items))
      ]))
    ).subscribe();
  }

  public expanded(expand: ExpandCompat): void {
    this.expands.filter((e) => e !== expand).forEach((e) => e.close());
  }

  private search(filter: string, model: Type<CrudModel>): Observable<any> {
    const joiner = CrudJoiner.of(model);
    const provider = model['provider'] as CrudProvider<BaseService, CrudModel>;

    switch (model) {
      case ActivityModel:
        joiner
          .with('address').yield('suburb')
          .with('category')
          .with('schedules');
        break;

      case BlogModel:
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
