import { AfterViewInit, HostBinding, OnInit, QueryList, Type, ViewChildren } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { CrudJoiner, CrudModel, CrudResolver, PlatformProvider, Selfrouter, Title } from '@wooportal/core';
import { ExpandCompatComponent } from '../../shared/compat/expand/expand.compat';
import { ExpandCompat } from '../../shared/compat/expand/expand.compat.i';

export abstract class BaseObject<Model extends CrudModel>
  extends Selfrouter implements OnInit, AfterViewInit {

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

  @ViewChildren(ExpandCompatComponent)
  private expands: QueryList<ExpandCompat>;

  public constructor(
    protected platformProvider: PlatformProvider,
    private i18n: I18n,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    super();
  }

  public ngOnInit(): void {
    this.titleService.set(this.item.name);
    this.ngPostInit();
  }

  public ngAfterViewInit(): void {
    if (this.expands.length && this.platformProvider.name !== 'Server') {
      this.expands.first.open();
    }
  }

  public expanded(expand: ExpandCompat): void {
    if (this.expands.length && this.platformProvider.name !== 'Server') {
      this.expands.filter((e) => e !== expand).forEach((e) => e.close());
    }
  }

  public string(id: string): string {
    return this.i18n({ id, value: id }) || id;
  }

  protected ngPostInit(): void { }

}
