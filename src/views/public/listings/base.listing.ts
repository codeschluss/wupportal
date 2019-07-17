import { OnInit, Type } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, Selfrouter } from '@wooportal/core';
import { BehaviorSubject } from 'rxjs';

export abstract class BaseListing<Model extends CrudModel>
  extends Selfrouter implements OnInit {

  protected abstract joiner: CrudJoiner;

  protected abstract model: Type<Model>;

  protected abstract path: string;

  protected abstract size: number;

  public items: BehaviorSubject<Model[]>;

  protected page: number = 0;

  protected get routing(): Route {
    this.joiner.graph.params.page = this.page;
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

  private length: number = 0;

  protected get next(): boolean {
    return !this.length || this.page < this.length - 1;
  }

  protected get prev(): boolean {
    return this.page > 0;
  }

  public constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.items = new BehaviorSubject<Model[]>(this.route.snapshot.data.items);
  }

}
