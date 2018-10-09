import { Component } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ClientRouter } from 'src/client.router';

@Component({
  selector: 'client-component',
  template: `<router-outlet></router-outlet>`
})

export class ClientComponent {

  public static readonly imports = [
    ClientRouter,
    ServiceWorkerModule.register('ngsw-worker.js')
  ];

}
