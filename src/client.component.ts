import { Component } from '@angular/core';
import { ClientRouter } from 'src/client.router';

@Component({
  selector: 'client-component',
  template: `<router-outlet></router-outlet>`
})

export class ClientComponent {

  public static readonly imports = [
    ClientRouter
  ];

}
