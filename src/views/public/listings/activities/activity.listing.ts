import { Component, ElementRef, HostListener, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
import { Observable } from 'rxjs';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { ActivityCardComponent } from '../../cards/activity/activity.card';
import { BaseListing } from '../base.listing';

@Component({
  styleUrls: ['activity.listing.scss'],
  templateUrl: 'activity.listing.html'
})

export class ActivityListingComponent
  extends BaseListing<ActivityModel> {

  protected joiner: CrudJoiner = CrudJoiner.of(ActivityModel)
    .with('address').yield('suburb')
    .with('category')
    .with('schedules');

  protected model: Type<ActivityModel> = ActivityModel;

  protected path: string = 'activities';

  protected size: number = 9;

  @ViewChildren(ActivityCardComponent)
  private cards: QueryList<ActivityCardComponent>;

  @ViewChild('maps', { read: ElementRef, static: true })
  private maps: ElementRef<HTMLIFrameElement>;

  public handleFocus(item: ActivityModel, event: Event): void {
    const card = this.cards.find((c) => c.item.id === item.id);

    switch (event.type) {
      case 'mouseenter':
        card.ripple.launch({ persistent: true });
        this.postMessage({ focus: item });
        break;

      case 'mouseleave':
        this.postMessage({ focus: null });
        card.ripple.fadeOutAll();
        break;
    }
  }

  @HostListener('window:message', ['$event'])
  public handleMessage(event: MessageEvent): void {
    Object.keys(event.data).forEach((key) => {
      switch (key) {
        case 'focus':
          const card = this.cards.find((c) => c.item.id === event.data[key].id);
          return !event.data[key]
            ? card.ripple.fadeOutAll()
            : card.ripple.launch({ persistent: true });
        case 'items':
          return !event.data[key]
            ? this.postMessage({ items: this.items.value })
            : null;
      }
    });
  }

  private postMessage(message: any): void {
    const data = JSON.parse(JSON.stringify(message, (key, value) =>
      key.startsWith('_') || value instanceof Observable ? undefined : value));

    this.maps.nativeElement.contentWindow.postMessage(data, window.origin);
  }

}
