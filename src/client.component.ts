import { Component } from '@angular/core';
import { ClientRouter } from 'src/client.router';

const imports = [
  ClientRouter
];

@Component({
  selector: 'client-component',
  template: `<router-outlet></router-outlet>`
})

export class ClientComponent { }

Object.assign(ClientComponent, { imports: imports });
