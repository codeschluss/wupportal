import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfrouter } from '@wooportal/core';
import { OrganisationModel } from '../../../../base/models/organisation.model';

@Component({
  selector: 'organisation-multi',
  styleUrls: ['organisation.multi.scss'],
  templateUrl: 'organisation.multi.html'
})

export class OrganisationMultiComponent extends Selfrouter {

  protected routing: Route = {
    path: 'organisations',
    resolve: {
      organisations: CrudResolver
    },
    data: {
      organisations: CrudJoiner.of(OrganisationModel)
        .with('address').yield('suburb')
        .with('images')
    }
  };

  public get organisations(): OrganisationModel[] {
    return this.route.snapshot.data.organisations || [];
  }

  public constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

}
