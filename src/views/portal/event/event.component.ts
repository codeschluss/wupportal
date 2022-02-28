import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ActivityModel, CrudJoiner, CrudResolver, RoutingComponent } from '../../../core';

@Component({
  styleUrls: ['event.component.sass'],
  templateUrl: 'event.component.html'
})

export class EventComponent
  extends RoutingComponent {

  public get item(): ActivityModel {
    return this.route.snapshot.data.item
  }

  protected get routing(): Route {
    return {
      path: 'event/:uuid',
      resolve: {
        item: CrudResolver
      },
      data: {
        resolve: {
          item: CrudJoiner.of(ActivityModel)
            .with('address')
            .with('category')
            .with('provider').yield('organisation')
            .with('schedules')
            .with('titleImage')
        }
      }
    };
  }

  public constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

}
