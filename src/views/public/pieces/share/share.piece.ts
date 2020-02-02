import { Component } from '@angular/core';
import { ApplicationSettings, DeviceProvider, SocialShare } from '@wooportal/app';
import { Headers } from '@wooportal/core';
import { take } from 'rxjs/operators';
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
    return this.app.config.defaults.appUrl
      + `/${this.namespace}/${this.item.id}`;
  }

  public constructor(
    private app: ApplicationSettings,
    private deviceProvider: DeviceProvider,
    private headers: Headers
  ) {
    super();
  }

  public copy(): void {
    const clipboard = this.deviceProvider.document.createElement('textarea');
    clipboard.style.opacity = '0';
    clipboard.style.position = 'absolute';
    clipboard.value = this.href;
    this.deviceProvider.document.body.appendChild(clipboard);

    clipboard.focus();
    clipboard.select();
    this.deviceProvider.document.execCommand('copy');
    this.deviceProvider.document.body.removeChild(clipboard);
  }

  public share(target?: ShareTarget): void {
    switch (this.deviceProvider.platform) {
      case 'Native':
        this.headers.name.pipe(take(1)).subscribe((name) =>
          SocialShare.shareUrl(this.href, `${this.item.name} | ${name}`));
        break;

      case 'Online':
        this.deviceProvider.document.defaultView
          .open(target.url + this.href, '_blank');
        break;
    }
  }

}
