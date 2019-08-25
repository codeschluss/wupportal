import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { PlatformProvider } from '@wooportal/core';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { BlogModel } from '../../../../realm/models/blog.model';
import { OrganisationModel } from '../../../../realm/models/organisation.model';
import { PageModel } from '../../../../realm/models/page.model';
import { ClientPackage } from '../../../../utils/package';
import { BasePiece } from '../base.piece';

interface Service {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'share-piece',
  styleUrls: ['../base.piece.scss', 'share.piece.scss'],
  templateUrl: 'share.piece.html'
})

export class SharePieceComponent extends BasePiece {

  public items: Service[] = [
    {
      name: 'Facebook',
      icon: 'facebook-f',
      url: 'https://www.facebook.com/sharer/sharer.php?u='
    },
    {
      name: 'Telegram',
      icon: 'telegram-plane',
      url: 'https://telegram.me/share/url?url='
    },
    {
      name: 'Twitter',
      icon: 'twitter',
      url: 'https://twitter.com/share?url='
    },
    {
      name: 'WhatsApp',
      icon: 'whatsapp',
      url: 'https://wa.me/?text='
    }
  ];

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private platformProvider: PlatformProvider
  ) {
    super();
  }

  public share(service: Service): void {
    const url = ClientPackage.config.defaults.appUrl + (() => {
      switch (this.item.constructor) {
        case ActivityModel: return '/activities/';
        case BlogModel: return '/blogposts/';
        case OrganisationModel: return '/organisations/';
        case PageModel: return '/infopages/';
      }
    })() + this.item.id;

    switch (this.platformProvider.type) {
      case 'Native':
        break;
      case 'Online':
        this.document.defaultView.open(service.url + url, '_blank');
        break;
    }
  }

}
