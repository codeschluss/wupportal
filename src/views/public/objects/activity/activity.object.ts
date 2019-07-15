import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfrouter } from '@wooportal/core';
import { ActivityModel } from '../../../../realm/models/activity.model';

@Component({
  styleUrls: ['activity.object.scss'],
  templateUrl: 'activity.object.html'
})

export class ActivityObjectComponent extends Selfrouter {

  protected routing: Route = {
    path: 'activities/:uuid',
    resolve: {
      activity: CrudResolver
    },
    data: {
      resolve: {
        activity: CrudJoiner.of(ActivityModel)
      }
    }
  };

}
