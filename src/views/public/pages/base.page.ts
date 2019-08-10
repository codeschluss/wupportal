import { Route } from '@angular/router';
import { Selfrouter } from '@wooportal/core';

export abstract class BasePage extends Selfrouter {

  protected abstract path: string;

  protected get routing(): Route {
    return {
      path: this.path
    };
  }

}
