import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CoreSettings, MetatagService } from '../../../../core';

@Component({
  selector: 'stores-gear',
  styleUrls: ['store-links.gear.sass'],
  templateUrl: 'store-links.gear.html'
})

export class StoreLinkssGearComponent
  implements OnInit {

  public stores: Observable<{
    label: string;
    href: string;
    image: string;
  }[]>;

  public constructor(
    private metatagService: MetatagService,
    private settings: CoreSettings
  ) { }

  public ngOnInit(): void {
    const { android, ios } = this.settings.storeIds;

    this.stores = this.metatagService.name.pipe(map((name) => [
      {
        label: `Google Play Store: ${name}`,
        href: `https://play.google.com/store/apps/details?id=${android}`,
        image: 'images/badge-google-play.svg'
      },
      {
        label: `Apple App Store: ${name}`,
        href: `https://apps.apple.com/app/id${ios}`,
        image: 'images/badge-app-store.svg'
      }
    ]));
  }

}
