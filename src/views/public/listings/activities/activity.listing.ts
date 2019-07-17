import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfrouter } from '@wooportal/core';
import { ActivityModel } from '../../../../realm/models/activity.model';

@Component({
  styleUrls: ['activity.listing.scss'],
  templateUrl: 'activity.listing.html'
})

export class ActivityListingComponent extends Selfrouter {

  protected routing: Route = {
    path: 'activities',
    resolve: {
      activities: CrudResolver
    },
    data: {
      resolve: {
        activities: CrudJoiner.of(ActivityModel, { })
          .with('address').yield('suburb')
          .with('category')
          .with('schedules')
      }
    }
  };

  public get items(): ActivityModel[] {
    return this.route.snapshot.data.activities.slice(0, 6) || [];
  }

  public constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

}
