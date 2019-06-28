import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { Selfrouter } from '@wooportal/core';

@Component({
  styleUrls: ['home.page.scss'],
  templateUrl: 'home.page.html'
})

export class HomePageComponent extends Selfrouter {

  protected routing: Route = {
    path: ''
  };

}
