import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { Selfrouter } from '@wooportal/core';

@Component({
  styleUrls: ['policies.page.scss'],
  templateUrl: 'policies.page.html'
})

export class PoliciesPageComponent extends Selfrouter {

  protected routing: Route = {
    path: 'policies'
  };

}
