import { Directive, HostBinding, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, skip } from 'rxjs/operators';
import { Arr, BaseService, CrudJoiner, CrudModel, CrudProvider, CrudResolver, PlatformProvider, ReadParams, RoutingComponent } from '../../../core';

@Directive()

// tslint:disable-next-line:directive-class-suffix
export abstract class BaseListing<Model extends CrudModel>
  extends RoutingComponent
  implements OnInit {

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  protected abstract path: string;

  protected abstract size: number;

  @HostBinding('attr.base')
  public readonly base: string = 'listing';

  public items: BehaviorSubject<Model[]>;

  public results: Observable<boolean>;

  public get page(): any {
    return (this.items.value as any).page;
  }

  public get next(): boolean {
    return this.page && this.page.number < this.page.totalPages - 1;
  }

  public get prev(): boolean {
    return this.page && this.page.number > 0;
  }

  protected get routing(): Route {
    return {
      path: this.path
    };
  }

  public constructor(
    protected platformProvider: PlatformProvider,
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
