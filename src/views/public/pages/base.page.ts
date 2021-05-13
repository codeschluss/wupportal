import { Directive, HostBinding } from '@angular/core';
import { Route } from '@angular/router';
import { RoutingComponent } from '../../../core';

@Directive()

// tslint:disable-next-line:directive-class-suffix
export abstract class BasePage
  extends RoutingComponent {

  protected abstract path: string;

  @HostBinding('attr.base')
  public readonly base: string = 'page';

  protected get routing(): Route {
    return {
      path: this.path
    };
  }

}
