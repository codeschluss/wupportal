import { Component } from '@angular/core';

@Component({
  selector: 'client-component',
  template: `
    <router-outlet></router-outlet>
    <loading-indicator></loading-indicator>
  `
})

export class ClientComponent { }
