import { AfterViewInit, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { DeviceProvider } from '@wooportal/app';
import { fromEvent } from 'rxjs';
import { LoadEventData, WebView } from 'tns-core-modules/ui/web-view';
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
    return '<style>*{font-family:sans-serif;}</style>' + this.data;
  }

  @ViewChild('webview', { read: ElementRef, static: true })
  private webview: ElementRef<WebView>;

  public constructor(
    private deviceProvider: DeviceProvider
  ) { }

  public ngAfterViewInit(): void {
    if (!this.webview.nativeElement.isLoaded) {
      this.webview.nativeElement.once('loaded', () => this.ngAfterViewInit());
    } else {
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

          fromEvent<LoadEventData>(wv, 'loadStarted').subscribe((event) =>
            this.deviceProvider.resourceClient(event));
          fromEvent<LoadEventData>(wv, 'loadFinished').subscribe((event) =>
            this.deviceProvider.resizeClient(event));
          break;
      }
    }
  }

}
