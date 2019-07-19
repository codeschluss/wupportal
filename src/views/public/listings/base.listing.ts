import { OnInit, Type } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BaseService, CrudJoiner, CrudModel, CrudProvider, CrudResolver, Selfrouter } from '@wooportal/core';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export abstract class BaseListing<Model extends CrudModel>
  extends Selfrouter implements OnInit {

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  protected abstract path: string;

  protected abstract size: number;

  public items: BehaviorSubject<Model[]>;

  public get next(): boolean {
    const page = (this.items.value as any).page;
    return page.number < page.totalPages - 1;
  }

  public get prev(): boolean {
    return (this.items.value as any).page.number > 0;
  }

  protected get routing(): Route {
    this.joiner.graph.params.page = this.route
      && this.route.snapshot.params.page || 0;
    this.joiner.graph.params.size = this.size;

    return {
      path: this.path,
      resolve: {
        items: CrudResolver
      },
      data: {
        resolve: {
          items: this.joiner
        }
      }
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
    this.items = new BehaviorSubject<Model[]>(this.route.snapshot.data.items);
    this.joiner.graph.params.embeddings = CrudJoiner.to(this.joiner.graph);
    this.joiner.graph.params.size = this.size;
  }

  public goto(rel: number): void {
    const provider = this.model['provider'] as CrudProvider<BaseService, Model>;
    this.joiner.graph.params.page = (this.items.value as any).page.number + rel;

    provider.readAll(this.joiner.graph.params).pipe(
      mergeMap((items) => this.crudResolver.refine(items, this.joiner.graph))
    ).subscribe((items) => {
      this.items.next(items as Model[]);

      this.router.navigate([], {
        queryParams: { page: (items as any).page.number },
        relativeTo: this.route
      });
    });
  }

}
