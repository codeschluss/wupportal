import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver, OrganisationModel, RoutingComponent } from '../../../core';

@Component({
  styleUrls: ['place.component.sass'],
  templateUrl: 'place.component.html'
})

export class PlaceComponent
  extends RoutingComponent {

  public get item(): OrganisationModel {
    return Object.assign(this.route.snapshot.data.item, {
      activities: this.route.snapshot.data.item.activities.map((i) => {
        return Object.assign(i, {
          provider: {
            organisation: this.route.snapshot.data.item
          }
        });
      })
    });
  }

  protected get routing(): Route {
    return {
      path: 'place/:uuid',
      resolve: {
        item: CrudResolver
      },
      data: {
        resolve: {
          item: CrudJoiner.of(OrganisationModel, {
            approved: true
          })
            .with('activities').yield('address')
            .with('activities').yield('category')
            .with('activities').yield('schedules')
            .with('activities').yield('titleImage')
            .with('address')
            .with('avatar')
            .with('images')
            .with('videos').yield('thumbnail')
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
