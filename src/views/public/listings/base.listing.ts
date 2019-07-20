import { OnInit, Type } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BaseService, CrudJoiner, CrudModel, CrudProvider, CrudResolver, ReadParams, Selfrouter } from '@wooportal/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';

export abstract class BaseListing<Model extends CrudModel>
  extends Selfrouter implements OnInit {

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  protected abstract path: string;

  protected abstract size: number;

  public items: BehaviorSubject<Model[]>;

  protected params: BehaviorSubject<ReadParams>;

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
    protected route: ActivatedRoute,
    protected router: Router,
    private crudResolver: CrudResolver
  ) {
    super();
  }

  public ngOnInit(): void {
    this.items = new BehaviorSubject<Model[]>([]);
    this.params = new BehaviorSubject<ReadParams>(Object.assign(
      this.mapParams(this.route.snapshot.queryParams),
      {
        embeddings: CrudJoiner.to(this.joiner.graph),
        page: this.route.snapshot.queryParams.page || 0,
        size: this.size
      }
    ));

    this.params.subscribe((params) => this.router.navigate([], {
      queryParams: this.mapParams(params),
      relativeTo: this.route
    }));

    this.ngPostInit();
    this.fetch().subscribe((items) => this.items.next(items));
  }

  public goto(rel: number): void {
    this.fetch({
      page: (this.items.value as any).page.number + rel
    }).subscribe((items) => this.items.next(items));
  }

  protected fetch(params?: ReadParams): Observable<Model[]> {
    const provider = this.model['provider'] as CrudProvider<BaseService, Model>;
    params = Object.assign(this.params.value, params);

    return provider.readAll(params).pipe(
      mergeMap((items) => this.crudResolver.refine(items, this.joiner.graph)),
      tap(() => this.params.next(params)),
      catchError(() => of([]))
    ) as Observable<Model[]>;
  }

  protected mapParams(params: ReadParams): ReadParams {
    return {
      page: params.page || null
    };
  }

  protected ngPostInit(): void { }

}
