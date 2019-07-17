import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfrouter } from '@wooportal/core';
import { OrganisationModel } from '../../../../realm/models/organisation.model';

@Component({
  styleUrls: ['organisation.listing.scss'],
  templateUrl: 'organisation.listing.html'
})

export class OrganisationListingComponent extends Selfrouter {

  protected routing: Route = {
    path: 'organisations',
    resolve: {
      organisations: CrudResolver
    },
    data: {
      resolve: {
        organisations: CrudJoiner.of(OrganisationModel)
          .with('address').yield('suburb')
          .with('images')
      }
    }
  };

  public get items(): OrganisationModel[] {
    return this.route.snapshot.data.organisations.slice(0, 6) || [];
  }

  public constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

}
