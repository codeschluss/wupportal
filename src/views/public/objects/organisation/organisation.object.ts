import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfrouter } from '@wooportal/core';
import { OrganisationModel } from '../../../../realm/models/organisation.model';

@Component({
  styleUrls: ['organisation.object.scss'],
  templateUrl: 'organisation.object.html'
})

export class OrganisationObjectComponent extends Selfrouter {

  protected routing: Route = {
    path: 'organisations/:uuid',
    resolve: {
      organisation: CrudResolver
    },
    data: {
      organisation: CrudJoiner.of(OrganisationModel)
    }
  };

}
