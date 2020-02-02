import { AfterViewInit, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { DeviceProvider } from '@wooportal/app';
import { WebView } from 'tns-core-modules/ui/web-view';
import { MarkedComponent as Compat } from './marked.component.i';

@Component({
  selector: 'marked-component',
  template: `
    <WebView #webview margin="-8" [src]="html"></WebView>
  `
})

export class MarkedComponent implements Compat, AfterViewInit {

  @HostBinding('attr.component')
  public readonly component: string = 'marked';

  @Input()
  public data: string;

  public get html(): string {
    return '<style>body{font-family:sans-serif;}</style>' + this.data;
  }

  @ViewChild('webview', { read: ElementRef, static: true })
  private webview: ElementRef<WebView>;

  public constructor(
    private deviceProvider: DeviceProvider
  ) { }

  public ngAfterViewInit(): void {
    if (this.webview.nativeElement.isLoaded) {
      let wv = this.webview.nativeElement as any;

      switch (this.deviceProvider.notation) {
        case 'Android':
          wv = wv.android;
          wv.setBackgroundColor(0x00000000);
          wv.getSettings().setSupportZoom(false);
          wv.setWebViewClient(new this.deviceProvider.webViewClient());
          break;

        case 'iOS':
          wv.ios.opaque = false;
          wv.ios.setDrawsBackground = false;
          wv.on('loadStarted', this.deviceProvider.resourceClient);
          wv.on('loadFinished', this.deviceProvider.resizeClient);
          break;
      }
    } else {
      this.webview.nativeElement.once('loaded', () => this.ngAfterViewInit());
    }
  }

}
