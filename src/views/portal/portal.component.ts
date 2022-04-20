import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreSettings, MetatagService } from '../../core';

@Component({
  template: `
    <router-outlet></router-outlet>
  `
})

export class PortalComponent {

  public constructor(
    metatagService: MetatagService,
    route: ActivatedRoute,
    settings: CoreSettings
  ) {
    const config = route.snapshot.data.configuration.reduce((obj, c) => {
      return Object.assign(obj, {
        [c.item]: c.value
      });
    }, { });

    metatagService.init({
      base: config.portalName,
      city: settings.defaults.city,
      slug: config.portalSubtitle,
      spot: [
        config.mapLatitude,
        config.mapLongitude
      ]
    });
  }

}
