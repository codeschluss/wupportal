import { HostBinding } from '@angular/core';
import { Route } from '@angular/router';
import { Selfrouter } from '@wooportal/core';

export abstract class BasePage extends Selfrouter {

  protected abstract path: string;

  @HostBinding('attr.base')
  public readonly base: string = 'page';

  protected get routing(): Route {
    return {
      path: this.path
    };
  }

}
