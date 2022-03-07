import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver, MetatagService, OrganisationModel, RoutingComponent } from '../../../core';

@Component({
  styleUrls: ['place.component.sass'],
  templateUrl: 'place.component.html'
})

export class PlaceComponent
  extends RoutingComponent
  implements OnInit {

  public get item(): OrganisationModel {
    return Object.assign(this.route.snapshot.data.item, {
      activities: this.route.snapshot.data.item.activities?.map((i) => {
        i.organisation = this.route.snapshot.data.item;
        return i;
      }) || []
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
    private metatagService: MetatagService,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.metatagService.setModel(this.item);
  }

}
