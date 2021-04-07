import { Component } from '@angular/core';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { CoreSettings, PlatformProvider } from '../../../../core';
import { BasePiece } from '../base.piece';

interface ShareTarget {
  name: string;
  icon: IconName;
  pack: IconPrefix;
  url: string;
}

@Component({
  selector: 'share-piece',
  styleUrls: ['../base.piece.sass', 'share.piece.sass'],
  templateUrl: 'share.piece.html'
})

export class SharePieceComponent
  extends BasePiece {

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
    return this.settings.app.baseUrl
      + `/${this.namespace}/${this.item.id}`;
  }

  public constructor(
    private platformProvider: PlatformProvider,
    private settings: CoreSettings
  ) {
    super();
  }

  public copy(): void {
    const clipboard = this.platformProvider.document.createElement('textarea');
    clipboard.style.opacity = '0';
    clipboard.style.position = 'absolute';
    clipboard.value = this.href;

    this.platformProvider.document.body.appendChild(clipboard);
    clipboard.focus();
    clipboard.select();

    const range = document.createRange();
    range.selectNodeContents(clipboard);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    clipboard.setSelectionRange(0, clipboard.value.length);
    this.platformProvider.document.execCommand('copy');
    this.platformProvider.document.body.removeChild(clipboard);
  }

  public share(target: ShareTarget): void {
    this.platformProvider.document.defaultView
      .open(target.url + this.href, '_blank');
  }

}
