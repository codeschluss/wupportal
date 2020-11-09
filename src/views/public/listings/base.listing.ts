import { HostBinding, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { DeviceProvider } from '@wooportal/app';
import { Arr, BaseService, CrudJoiner, CrudModel, CrudProvider, CrudResolver, ReadParams, Selfrouter } from '@wooportal/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, skip } from 'rxjs/operators';

export abstract class BaseListing<Model extends CrudModel>
  extends Selfrouter implements OnInit {

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  protected abstract path: string;

  protected abstract size: number;

  @HostBinding('attr.base')
  public readonly base: string = 'listing';

  public items: BehaviorSubject<Model[]>;

  public results: Observable<boolean>;

  public get next(): boolean {
    const page = (this.items.value as any).page;
    return page && page.number < page.totalPages - 1;
  }

  public get prev(): boolean {
    const page = (this.items.value as any).page;
    return page && page.number > 0;
  }

  protected get routing(): Route {
    return {
      path: this.path
    };
  }

  public constructor(
    protected deviceProvider: DeviceProvider,
    protected route: ActivatedRoute,
    protected router: Router,
    private crudResolver: CrudResolver
  ) {
    super();
  }

  public ngOnInit(): void {
    this.items = new BehaviorSubject<Model[]>([]);
    this.results = this.items.pipe(skip(1), map((i) => i.length > 0));
    this.route.queryParams.subscribe((p) => this.fetch(this.params(p)));
  }

  protected navigate(params: Params): Promise<boolean> {
    Object.keys(params).forEach((key) => {
      params.page = key === 'page' ? params[key] : null;
      params[key] = Arr(params[key]).length ? params[key] : null;
    });

    return this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
      relativeTo: this.route
    });
  }

  protected params(params: Params): ReadParams {
    return {
      page: params.page || null
    };
  }

  private fetch(params?: ReadParams): void {
    const provider = (this.model as any)
      .provider as CrudProvider<BaseService, Model>;

    provider.readAll(Object.assign(params, this.joiner.graph.params, {
      embeddings: CrudJoiner.to(this.joiner.graph),
      page: params.page || 0,
      size: this.size
    })).pipe(
      mergeMap((items) => this.crudResolver.refine(items, this.joiner.graph)),
      catchError(() => of([]))
    ).subscribe((items) => this.items.next(items as Model[]));
  }

}
