import { AfterViewInit, HostBinding, OnInit, QueryList, Type, ViewChildren } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { DeviceProvider, openUrl } from '@wooportal/app';
import { CrudJoiner, CrudModel, CrudResolver, Headers, Selfrouter } from '@wooportal/core';
import { ExpandComponent } from '../../shared/expand/expand.component';

export abstract class BaseObject<Model extends CrudModel>
  extends Selfrouter implements OnInit, AfterViewInit {

  protected abstract model: Type<Model>;

  protected abstract joiner: CrudJoiner;

  protected abstract path: string;

  @HostBinding('attr.base')
  public readonly base: string = 'object';

  public openUrl: (url: string) => boolean = openUrl;

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

  @ViewChildren(ExpandComponent)
  private expands: QueryList<ExpandComponent>;

  public constructor(
    public router: Router,
    protected deviceProvider: DeviceProvider,
    private headers: Headers,
    private i18n: I18n,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.headers.setModel(this.item);
    this.ngPostInit();
  }

  public ngAfterViewInit(): void {
    if (this.expands.length && this.deviceProvider.notation !== 'Server') {
      this.expands.first.open();
    }

    this.ngPostViewInit();
  }

  public expanded(expand: ExpandComponent): void {
    if (this.expands.length && this.deviceProvider.notation !== 'Server') {
      this.expands.filter((e) => e !== expand).forEach((e) => e.close());
    }
  }

  public string(id: string): string {
    return this.i18n({ id, value: id }) || id;
  }

  protected ngPostInit(): void { }

  protected ngPostViewInit(): void { }

}
