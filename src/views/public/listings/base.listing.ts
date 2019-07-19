import { OnInit, Type } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BaseService, CrudJoiner, CrudModel, CrudProvider, CrudResolver, Selfrouter } from '@wooportal/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

export abstract class BaseListing<Model extends CrudModel>
  extends Selfrouter implements OnInit {

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  protected abstract path: string;

  protected abstract size: number;

  public items: BehaviorSubject<Model[]>;

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

    this.joiner.graph.params.embeddings = CrudJoiner.to(this.joiner.graph);
    this.joiner.graph.params.size = this.size;

    this.fetch(this.route.snapshot.queryParams.page)
      .subscribe((items) => this.items.next(items as Model[]));
  }

  public goto(rel: number): void {
    this.fetch((this.items.value as any).page.number + rel).pipe(
      tap((items) => this.router.navigate([], {
        queryParams: { page: (items as any).page.number },
        relativeTo: this.route
      }))
    ).subscribe((items) => this.items.next(items as Model[]));
  }

  private fetch(page: number = 0): Observable<Model[]> {
    const provider = this.model['provider'] as CrudProvider<BaseService, Model>;
    this.joiner.graph.params.page = page;

    return provider.readAll(this.joiner.graph.params).pipe(
      mergeMap((items) => this.crudResolver.refine(items, this.joiner.graph))
    ) as Observable<Model[]>;
  }

}
