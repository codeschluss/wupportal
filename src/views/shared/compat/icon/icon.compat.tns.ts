import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { PlatformProvider } from '@wooportal/core';
import { ContentView } from 'tns-core-modules/ui/page';
import { WebView } from 'tns-core-modules/ui/web-view';
import { IconCompat } from './icon.compat.i';

@Component({
  selector: 'icon-compat',
  template: `
    <WebView [src]="source" (loaded)="init($event.object)"></WebView>
  `
})

export class IconCompatComponent extends ContentView
  implements IconCompat, OnInit, OnChanges {

  @Input()
  public icon: string;

  public source: string;

  public constructor(
    private platformProvider: PlatformProvider
  ) {
    super();
  }

  public ngOnInit(): void {
    this.source = this.getIcon(this.icon);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.icon) {
      this.source = this.getIcon(this.icon);
    }
  }

  public init(view: WebView): void {
    view.on('touch', () => true);

    switch (this.platformProvider.name) {
      case 'Android':
        view.android.setBackgroundColor(0x00000000);
        view.android.setHorizontalScrollBarEnabled(false);
        view.android.setVerticalScrollBarEnabled(false);
        view.android.getSettings().setSupportZoom(false);
        break;

      case 'iOS':
        // TODO: BUY_MAC
        // view.ios.opaque = false;
        // view.ios.setDrawsBackground = false;
        // view.ios.showsHorizontalScrollIndicator = false;
        // view.ios.showsVerticalScrollIndicator = false;
        break;
    }
  }

  private getIcon(name: string): string {
    return icon({
      iconName: name as any,
      prefix: 'fas'
    }).html.join('');
  }

}
