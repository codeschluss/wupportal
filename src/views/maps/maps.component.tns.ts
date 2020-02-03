import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route } from '@angular/router';
import { ApplicationSettings, DeviceProvider, GeoLocation } from '@wooportal/app';
import { Selfrouter } from '@wooportal/core';
import { WebView } from 'tns-core-modules/ui/web-view';

@Component({
  styleUrls: ['maps.component.scss'],
  templateUrl: 'maps.component.html'
})

export class MapsComponent
  extends Selfrouter implements OnInit, AfterViewInit {

  protected routing: Route = {
    path: ''
  };

  @ViewChild('webview', { read: ElementRef, static: true })
  private webview: ElementRef<WebView>;

  public get source(): string {
    return `${this.app.config.defaults.appUrl}/mapview?native`;
  }

  public constructor(
    private app: ApplicationSettings,
    private deviceProvider: DeviceProvider
  ) {
    super();
  }

  public ngOnInit(): void {
    GeoLocation.enableLocationRequest().catch(() => { });
  }

  public ngAfterViewInit(): void {
    if (this.webview.nativeElement.isLoaded) {
      let wv = this.webview.nativeElement as any;

      switch (this.deviceProvider.notation) {
        case 'Android':
          wv = wv.android;
          wv.getSettings().setGeolocationEnabled(true);
          wv.getSettings().setJavaScriptEnabled(true);
          wv.setWebChromeClient(new this.deviceProvider.webChromeClient());
          wv.setWebViewClient(new this.deviceProvider.webViewClient());
          break;

        case 'iOS':
          wv.on('loadStarted', this.deviceProvider.resourceClient);
          break;
      }
    } else {
      this.webview.nativeElement.once('loaded', () => this.ngAfterViewInit());
    }
  }

}
