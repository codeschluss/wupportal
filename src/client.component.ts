import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'client-component',
  template: `
    <router-outlet></router-outlet>
    <loading-indicator></loading-indicator>
  `
})

export class ClientComponent {

  constructor(
    private titleService: Title) {
      this.setTitle('Wupp\'n\'go');
    }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

}
