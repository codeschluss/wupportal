import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
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
    return icon({
      iconName: this.icon as any,
      prefix: 'fas'
    }, {
      styles: {
        color: this.webview.nativeElement.style.color
          ? this.webview.nativeElement.style.color.hex
          : 'inherit',
        'fill-opacity': this.webview.nativeElement.style.color
          ? (this.webview.nativeElement.style.color.a / 255).toString()
          : '100%',
      }
    }).html.join('');
  }

  public constructor(
    private platformProvider: PlatformProvider
  ) { }

  public ngAfterViewInit(): void {
    switch (this.platformProvider.name) {
      case 'Android':
        // TODO: https://github.com/NativeScript/nativescript-angular/issues/848
        if (!this.webview.nativeElement.android) {
          return this.webview.nativeElement.once('loaded', () => {
            this.ngAfterViewInit();
          });
        }

        this.webview.nativeElement.android.setBackgroundColor(0x00000000);
        this.webview.nativeElement.android.setHorizontalScrollBarEnabled(false);
        this.webview.nativeElement.android.setVerticalScrollBarEnabled(false);
        this.webview.nativeElement.android.getSettings().setSupportZoom(false);
        break;

      case 'iOS':
        // TODO: BUY_MAC
        this.webview.nativeElement.ios.opaque = false;
        this.webview.nativeElement.ios.setDrawsBackground = false;
        this.webview.nativeElement.ios.showsHorizontalScrollIndicator = false;
        this.webview.nativeElement.ios.showsVerticalScrollIndicator = false;
        break;
    }
  }

}
