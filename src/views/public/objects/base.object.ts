import { AfterViewInit, Directive, HostBinding, OnInit, QueryList, Type, ViewChildren } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CrudJoiner, CrudModel, CrudResolver, MetatagService, PlatformProvider, RoutingComponent } from '../../../core';

@Directive()

// tslint:disable-next-line:directive-class-suffix
export abstract class BaseObject<Model extends CrudModel>
  extends RoutingComponent
  implements OnInit, AfterViewInit {

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

  @ViewChildren(MatExpansionPanel)
  private expands: QueryList<MatExpansionPanel>;

  public constructor(
    public router: Router,
    protected platformProvider: PlatformProvider,
    private metatagService: MetatagService,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.metatagService.setModel(this.item);
  }

  public ngAfterViewInit(): void {
    if (this.expands.length && this.platformProvider.name !== 'server') {
      this.expands.first.open();
    }
  }

  public expanded(expand: MatExpansionPanel): void {
    if (this.expands.length && this.platformProvider.name !== 'server') {
      this.expands.filter((e) => e !== expand).forEach((e) => e.close());
    }
  }

  public string(id: string): string {
    return id;
  }

}
