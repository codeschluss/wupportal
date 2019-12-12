import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Headers } from '@wooportal/core';
import { ClientPackage } from '../../utils/package';

@Component({
  template: `
    <router-outlet></router-outlet>
  `
})

export class PublicComponent {

  public constructor(
    headers: Headers,
    route: ActivatedRoute
  ) {
    const conf = route.snapshot.data.configuration;

    headers.init({
      base: conf.find((c) => c.item === 'portalName').value,
      city: ClientPackage.config.defaults.city,
      slug: conf.find((c) => c.item === 'portalSubtitle').value,
      spot: [
        conf.find((c) => c.item === 'mapLatitude').value,
        conf.find((c) => c.item === 'mapLongitude').value
      ]
    });

    headers.setTitle(null);
  }

}
