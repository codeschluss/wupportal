import { HostBinding, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, Selfrouter, Title } from '@wooportal/core';

export abstract class BaseObject<Model extends CrudModel>
  extends Selfrouter implements OnInit {

  protected abstract model: Type<Model>;

  protected abstract joiner: CrudJoiner;

  protected abstract path: string;

  @HostBinding('attr.base')
  public readonly base: string = 'object';

  public get item(): Model {
    return this.route.snapshot.data.item;
  }

  protected get routing(): Route {
    return {
      path: `${this.path}/:uuid`,
      resolve: {
        item: CrudResolver
      },
      data: {
        resolve: {
          item: this.joiner
        }
      }
    };
  }

  public constructor(
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    super();
  }

  public ngOnInit(): void {
    this.titleService.set(this.item.name);
  }

}
