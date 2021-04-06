import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreSettings, MetatagService } from '../../core';

@Component({
  template: `
    <router-outlet></router-outlet>
  `
})

export class PublicComponent {

  public constructor(
    metatagService: MetatagService,
    route: ActivatedRoute,
    settings: CoreSettings
  ) {
    const conf = route.snapshot.data.configuration;

    metatagService.init({
      base: conf.find((c) => c.item === 'portalName').value,
      city: settings.defaults.city,
      slug: conf.find((c) => c.item === 'portalSubtitle').value,
      spot: [
        conf.find((c) => c.item === 'mapLatitude').value,
        conf.find((c) => c.item === 'mapLongitude').value
      ]
    });
  }

}
