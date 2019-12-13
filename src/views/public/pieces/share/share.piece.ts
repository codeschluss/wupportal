import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Headers, PlatformProvider } from '@wooportal/core';
import { take } from 'rxjs/operators';
import { ClientPackage } from '../../../../utils/package';
import { SocialShare } from '../../../shared/shared.imports';
import { BasePiece } from '../base.piece';

interface ShareTarget {
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

  public items: ShareTarget[] = [
    {
      name: 'E-Mail',
      icon: 'envelope',
      pack: 'fas',
      url: 'mailto:?subject=&body='
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

  private get href(): string {
    return ClientPackage.config.defaults.appUrl
      + `/${this.namespace}/${this.item.id}`;
  }

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private headers: Headers,
    private platformProvider: PlatformProvider
  ) {
    super();
  }

  public copy(): void {
    const clipboard = this.document.createElement('textarea');
    clipboard.style.opacity = '0';
    clipboard.style.position = 'absolute';
    clipboard.value = this.href;
    this.document.body.appendChild(clipboard);

    clipboard.focus();
    clipboard.select();
    this.document.execCommand('copy');
    this.document.body.removeChild(clipboard);
  }

  public share(target?: ShareTarget): void {
    switch (this.platformProvider.type) {
      case 'Native':
        this.headers.name.pipe(take(1)).subscribe((name) =>
          SocialShare.shareUrl(this.href, `${this.item.name} | ${name}`));
        break;

      case 'Online':
        this.document.defaultView.open(target.url + this.href, '_blank');
        break;
    }
  }

}
