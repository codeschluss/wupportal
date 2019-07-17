import { Component, QueryList, Type, ViewChildren } from '@angular/core';
import { CrudJoiner } from '@wooportal/core';
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

  public handleFocus(item: ActivityModel, event: Event): void {
    const card = this.cards.find((c) => c.item.id === item.id);

    switch (event.type) {
      case 'mouseenter':
        card.ripple.launch({ persistent: true });
        break;

      case 'mouseleave':
        card.ripple.fadeOutAll();
        break;
    }
  }

}
