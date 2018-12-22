import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { Selfrouter } from '@portal/core';

@Component({
  templateUrl: './organisation.panel.html'
})

export class OrganisationPanelComponent extends Selfrouter {

  protected routing: Route = {
    path: 'organisation',
    component: OrganisationPanelComponent,
    resolve: {
    },
    data: {
    }
  };

}
