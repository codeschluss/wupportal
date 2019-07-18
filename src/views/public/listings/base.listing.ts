import { OnInit, Type } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
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

  protected get routing(): Route {
    this.joiner.graph.params.page = 0;
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

  protected get next(): boolean {
    const page = (this.items.value as any).page;
    return page.number < page.totalPages - 1;
  }

  protected get prev(): boolean {
    return (this.items.value as any).page.number > 0;
  }

  public constructor(
    private crudResolver: CrudResolver,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.items = new BehaviorSubject<Model[]>(this.route.snapshot.data.items);
  }

  public goto(num: number): void {
    const provider = this.model['provider'] as CrudProvider<BaseService, Model>;
    this.joiner.graph.params.embeddings = CrudJoiner.to(this.joiner.graph);
    this.joiner.graph.params.page = (this.items.value as any).page.number + num;
    this.joiner.graph.params.size = this.size;

    provider.readAll(this.joiner.graph.params).pipe(
      mergeMap((items) => this.crudResolver.refine(items, this.joiner.graph))
    ).subscribe((items) => this.items.next(items as Model[]));
  }

}
