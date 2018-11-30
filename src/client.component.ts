import { Component } from '@angular/core';
import { ApiConfiguration } from './api/api-configuration';
import { ClientPackage } from './utils/package';

@Component({
  selector: 'client-component',
  template: `<router-outlet></router-outlet>`
})

export class ClientComponent {

  public constructor(
    apiConfiguration: ApiConfiguration,
    clientPackage: ClientPackage,
  ) {
    apiConfiguration.rootUrl = clientPackage.config.api.rootUrl;
  }

}
