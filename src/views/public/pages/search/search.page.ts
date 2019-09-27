import { Component, OnInit, QueryList, Type, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService, CrudJoiner, CrudModel, CrudProvider, CrudResolver } from '@wooportal/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { BlogpostModel } from '../../../../realm/models/blogpost.model';
import { CategoryModel } from '../../../../realm/models/category.model';
import { InfopageModel } from '../../../../realm/models/infopage.model';
import { OrganisationModel } from '../../../../realm/models/organisation.model';
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
    blogposts: BlogpostModel[],
    categories: CategoryModel[],
    organisations: OrganisationModel[],
    infopages: InfopageModel[],
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

  public results: number = -1;

  protected path: string = 'search/:filter';

  @ViewChildren(ExpandCompatComponent)
  private expands: QueryList<ExpandCompat>;

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

  public expanded(expand: ExpandCompat): void {
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
