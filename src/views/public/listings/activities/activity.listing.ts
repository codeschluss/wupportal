import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudJoiner, CrudResolver, PlatformProvider } from '@wooportal/core';
import { BehaviorSubject } from 'rxjs';
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

  private focus: BehaviorSubject<ActivityModel[]>;

  @ViewChildren(ActivityCardComponent)
  private cards: QueryList<ActivityCardComponent>;

  @ViewChild('maps', { read: ElementRef, static: true })
  private maps: ElementRef<HTMLIFrameElement>;

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private platformProvider: PlatformProvider,
    crudResolver: CrudResolver,
    route: ActivatedRoute
  ) {
    super(crudResolver, route);
  }

  public ngAfterViewInit(): void {
    this.focus = new BehaviorSubject<ActivityModel[]>([]);

    if (this.platformProvider.name === 'Web') {
      const source = this.document.defaultView;
      const target = this.maps.nativeElement.contentWindow;
      this.connection = new MapsConnection(source, target);

      target.onload = () => {
        this.connection.focus.subscribe((focus) => this.focus.next(focus));
        this.connection.items.subscribe((items) => this.items.next(items));

        this.focus.subscribe((focus) => this.connection.nextFocus(focus));
        this.items.subscribe((items) => this.connection.nextItems(items));
      }
    }
  }

  public handleFocus(item: ActivityModel, event: Event): void {
    const card = this.cards.find((c) => c.item.id === item.id);

    switch (event.type) {
      case 'mouseenter':
        card.ripple.launch({ persistent: true });
        this.connection.nextFocus([item]);
        break;

      case 'mouseleave':
        this.connection.nextFocus([]);
        card.ripple.fadeOutAll();
        break;
    }
  }

}
