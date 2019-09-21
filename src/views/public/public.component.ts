import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@wooportal/core';

@Component({
  template: `
    <router-outlet></router-outlet>
  `
})

export class PublicComponent {

  public constructor(
    route: ActivatedRoute,
    titleService: Title
  ) {
    titleService.setBase(route.snapshot.data.
      configuration.find((c) => c.item === 'portalName').value);

    titleService.set(null);
  }

}
