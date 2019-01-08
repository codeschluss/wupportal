import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoadingProvider } from '@portal/core';
import { ConfigurationProvider } from './realm/configuration/configuration.provider';

@Component({
  selector: 'client-component',
  template: `
  <main id="client" [class.disabled]="loadingProvider.value | async">
    <router-outlet></router-outlet>
    <loading-indicator></loading-indicator>
  </main>
  `,
  styleUrls: ['client.component.scss']
})

export class ClientComponent {

  constructor(
    private titleService: Title,
    private configProvider: ConfigurationProvider,
    public loadingProvider: LoadingProvider
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
