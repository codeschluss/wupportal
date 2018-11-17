import { Component } from '@angular/core';
import { ConfigurationProvider } from 'src/core/providers/configuration.provider';

@Component({
  template: `<router-outlet></router-outlet>`
})

export class AdminComponent {

  public constructor(
    conf: ConfigurationProvider
  ) {
    conf.findAll().then((i) => console.log(i));
  }

  public static readonly imports = [
  ];

}
