import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { Selfrouter } from '@wooportal/core';

@Component({
  styleUrls: ['imprint.page.scss'],
  templateUrl: 'imprint.page.html'
})

export class ImprintPageComponent extends Selfrouter {

  protected routing: Route = {
    path: 'imprint'
  };

}
