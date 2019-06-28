import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfrouter } from '@wooportal/core';
import { ActivityModel } from '../../../../realm/models/activity.model';

@Component({
  styleUrls: ['activity.list.scss'],
  templateUrl: 'activity.list.html'
})

export class ActivityListComponent extends Selfrouter {

  protected routing: Route = {
    path: 'activities',
    resolve: {
      activities: CrudResolver
    },
    data: {
      activities: CrudJoiner.of(ActivityModel)
    }
  };

}
