import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationSettings } from '@wooportal/app';
import { Headers } from '@wooportal/core';

@Component({
  template: `
    <router-outlet></router-outlet>
  `
})

export class PublicComponent {

  public constructor(
    app: ApplicationSettings,
    headers: Headers,
    route: ActivatedRoute
  ) {
    const conf = route.snapshot.data.configuration;

    headers.init({
      base: conf.find((c) => c.item === 'portalName').value,
      city: app.config.defaults.city,
      slug: conf.find((c) => c.item === 'portalSubtitle').value,
      spot: [
        conf.find((c) => c.item === 'mapLatitude').value,
        conf.find((c) => c.item === 'mapLongitude').value
      ]
    });
  }

}
