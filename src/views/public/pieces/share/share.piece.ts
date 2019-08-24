import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformProvider } from '@wooportal/core';
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
    private platformProvider: PlatformProvider,
    private router: Router
  ) {
    super();
  }

  public share(service: Service): void {
    const url = !this.router.url.endsWith(this.item.id)
      ? `${this.router.url}/${this.item.id}`
      : this.router.url;

    switch (this.platformProvider.type) {
      case 'Native':
        break;
      case 'Online':
        this.document.defaultView.open(
          service.url + ClientPackage.config.defaults.appUrl + url,
          '_blank'
        );
        break;
    }
  }

}
