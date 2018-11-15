import { Component } from '@angular/core';
import { ApiConfiguration } from './core/api/api-configuration';

@Component({
  selector: 'client-component',
  template: `<router-outlet></router-outlet>`
})

export class ClientComponent {

  public static readonly imports = [
  ];

  public constructor(
    private apiConfiguration: ApiConfiguration
  ) {
    this.apiConfiguration.rootUrl = '/api';
  }

}
