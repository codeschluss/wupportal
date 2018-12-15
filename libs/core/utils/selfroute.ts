import { Route } from '@angular/router';

export abstract class Selfroute {

  protected abstract routing: Route;

  public static get routing(this: any): Route {
    return new this().routing;
  }

}
