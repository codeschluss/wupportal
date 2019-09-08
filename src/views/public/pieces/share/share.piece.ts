import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { PlatformProvider, SocialShare } from '@wooportal/core';
import { ActivityModel } from '../../../../realm/models/activity.model';
import { BlogModel } from '../../../../realm/models/blog.model';
import { OrganisationModel } from '../../../../realm/models/organisation.model';
import { PageModel } from '../../../../realm/models/page.model';
import { ClientPackage } from '../../../../utils/package';
import { BasePiece } from '../base.piece';

interface Service {
  name: string;
  icon: string;
  pack: string;
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
      name: 'E-Mail',
      icon: 'envelope',
      pack: 'fas',
      url: 'mailto:?body='
    },
    {
      name: 'Facebook',
      icon: 'facebook-f',
      pack: 'fab',
      url: 'https://www.facebook.com/sharer/sharer.php?u='
    },
    {
      name: 'Telegram',
      icon: 'telegram-plane',
      pack: 'fab',
      url: 'https://telegram.me/share/url?url='
    },
    {
      name: 'Twitter',
      icon: 'twitter',
      pack: 'fab',
      url: 'https://twitter.com/share?url='
    },
    {
      name: 'WhatsApp',
      icon: 'whatsapp',
      pack: 'fab',
      url: 'https://wa.me/?text='
    }
  ];

  public get href(): string {
    return ClientPackage.config.defaults.appUrl + (() => {
      switch (this.item.constructor) {
        case ActivityModel: return '/activities/';
        case BlogModel: return '/blogposts/';
        case OrganisationModel: return '/organisations/';
        case PageModel: return '/infopages/';
      }
    })() + this.item.id;
  }

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private platformProvider: PlatformProvider
  ) {
    super();
  }

  public copy(): void {
    switch (this.platformProvider.type) {
      case 'Native':
        break;
      case 'Online':
        const clipboard = this.document.createElement('textarea');
        clipboard.style.opacity = '0';
        clipboard.style.position = 'absolute';
        clipboard.value = this.href;
        this.document.body.appendChild(clipboard);

        clipboard.focus();
        clipboard.select();
        this.document.execCommand('copy');
        this.document.body.removeChild(clipboard);
        break;
    }
  }

  public share(service: Service): void {
    switch (this.platformProvider.type) {
      case 'Native':
        break;
      case 'Online':
        this.document.defaultView.open(service.url + this.href, '_blank');
        break;
    }
  }

  public shareNative(): void {
    SocialShare.shareUrl(this.href, this.item.name);
  }

}
