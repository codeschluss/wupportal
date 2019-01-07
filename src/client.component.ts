import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigurationProvider } from './realm/configuration/configuration.provider';

@Component({
  selector: 'client-component',
  template: `
      <router-outlet></router-outlet>
      <loading-indicator></loading-indicator>
  `
})

export class ClientComponent {

  constructor(
    private titleService: Title,
    private configProvider: ConfigurationProvider
    ) {
      this.configProvider.readAll()
      .subscribe(configs => {
        this.setTitle(configs.find(
              config => config.item === 'portalName').value
              );
            });
    }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

}
