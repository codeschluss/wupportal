import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { PlatformProvider } from '@wooportal/core';
import { WebView } from 'tns-core-modules/ui/web-view';
import { IconCompat } from './icon.compat.i';

@Component({
  selector: 'icon-compat',
  template: `
    <WebView #webview [src]="source" (tap)="true"></WebView>
  `
})

export class IconCompatComponent implements IconCompat, AfterViewInit {

  @Input()
  public icon: string;

  @ViewChild('webview', { read: ElementRef, static: true })
  private webview: ElementRef<WebView>;

  public get source(): string {
    const color = this.webview.nativeElement.style.color;

    return icon({
      iconName: this.icon as any,
      prefix: 'fas'
    }, {
      styles: {
        color: color ? color.hex : 'inherit',
        'fill-opacity': color ? (color.a / 255).toString() : '100%',
      }
    }).html.join('');
  }

  public constructor(
    private changeDetection: ChangeDetectorRef,
    private platformProvider: PlatformProvider
  ) { }

  public ngAfterViewInit(): void {
    const wv = this.webview.nativeElement;

    // TODO: https://github.com/NativeScript/nativescript-angular/issues/848
    if (this.platformProvider.name === 'Android' && !wv.android) {
      return wv.once('loaded', () => this.ngAfterViewInit());
    }

    switch (this.platformProvider.name) {
      case 'Android':
        this.changeDetection.detectChanges();
        wv.android.setBackgroundColor(0x00000000);
        wv.android.setHorizontalScrollBarEnabled(false);
        wv.android.setVerticalScrollBarEnabled(false);
        wv.android.getSettings().setSupportZoom(false);
        return;

      case 'iOS':
        // TODO: BUY_MAC
        wv.ios.opaque = false;
        wv.ios.setDrawsBackground = false;
        wv.ios.showsHorizontalScrollIndicator = false;
        wv.ios.showsVerticalScrollIndicator = false;
        return;
    }
  }

}
