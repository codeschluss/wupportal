import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudJoiner, CrudResolver, PlatformProvider } from '@wooportal/core';
import { filter, take } from 'rxjs/operators';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { MapsConnection } from '../../../maps/maps.connection';
import { ActivityCardComponent } from '../../cards/activity/activity.card';
import { BaseListing } from '../base.listing';

@Component({
  styleUrls: ['activity.listing.scss'],
  templateUrl: 'activity.listing.html'
})

export class ActivityListingComponent
  extends BaseListing<ActivityModel> implements AfterViewInit {

  protected joiner: CrudJoiner = CrudJoiner.of(ActivityModel)
    .with('address').yield('suburb')
    .with('category')
    .with('schedules');

  protected model: Type<ActivityModel> = ActivityModel;

  protected path: string = 'activities';

  protected size: number = 6;

  private connection: MapsConnection;

  @ViewChildren(ActivityCardComponent)
  private cards: QueryList<ActivityCardComponent>;

  @ViewChild('maps', { read: ElementRef, static: true })
  private maps: ElementRef<HTMLIFrameElement>;

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private platformProvider: PlatformProvider,
    crudResolver: CrudResolver,
    route: ActivatedRoute,
    router: Router
  ) {
    super(route, router, crudResolver);
  }

  public ngAfterViewInit(): void {
    if (this.platformProvider.name === 'Web') {
      const source = this.document.defaultView;
      const target = this.maps.nativeElement.contentWindow;

      this.connection = new MapsConnection(source, target);
      this.connection.focus.subscribe((focus) => this.focusing(focus));
      // this.connection.items.subscribe((items) => this.items.next(items));
      this.connection.nextReady(true);

      this.connection.ready.pipe(filter(Boolean), take(1)).subscribe(() =>
        this.items.subscribe((items) => this.connection.nextItems(items)));
    }
  }

  public handleFocus(item: ActivityModel, event: Event): void {
    switch (event.type) {
      case 'mouseenter': return this.connection.nextFocus(this.focusing(item));
      case 'mouseleave': return this.connection.nextFocus(this.focusing(null));
    }
  }

  private focusing(input: ActivityModel | ActivityModel[]): ActivityModel[] {
    this.cards.forEach((card) => card.ripple.fadeOutAll());
    const items = (Array.isArray(input) ? input : [input]);

    if (input) {
      items.map((i) => this.cards.find((c) => c.item.id === i.id).ripple)
        .forEach((ripple) => ripple.launch({ persistent: true }));
    }

    return input ? items : [];
  }

}
