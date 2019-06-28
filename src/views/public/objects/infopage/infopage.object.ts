import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { CrudJoiner, CrudResolver, Selfrouter } from '@wooportal/core';
import { PageModel } from '../../../../realm/models/page.model';

@Component({
  styleUrls: ['infopage.object.scss'],
  templateUrl: 'infopage.object.html'
})

export class InfopageObjectComponent extends Selfrouter {

  protected routing: Route = {
    path: 'infopages/:uuid',
    resolve: {
      infopage: CrudResolver
    },
    data: {
      infopage: CrudJoiner.of(PageModel)
    }
  };

}
