import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { Selfroute } from '@portal/core';

@Component({
  templateUrl: './organisation.panel.html'
})

export class OrganisationPanelComponent extends Selfroute {

  protected routing: Route = {
    path: 'organisation',
    component: OrganisationPanelComponent,
    resolve: {
    },
    data: {
    }
  };

}
