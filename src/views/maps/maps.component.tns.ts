import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PlatformProvider, Selfrouter } from '@wooportal/core';
import * as geolocation from 'nativescript-geolocation';
import { WebView } from 'tns-core-modules/ui/web-view';
import { WebChromeClientFactory, WebViewClientFactory } from '../../utils/clients';
import { ClientPackage } from '../../utils/package';

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
    return `${ClientPackage.config.defaults.appUrl}/mapview?native`;
  }

  public constructor(
    private changeDetection: ChangeDetectorRef,
    private platformProvider: PlatformProvider,
    private router: Router,
    private zone: NgZone
  ) {
    super();
  }

  public ngOnInit(): void {
    geolocation.enableLocationRequest().catch(() => null);
  }

  public ngAfterViewInit(): void {
    let wv = this.webview.nativeElement as any;

    // tslint:disable-next-line
    if(!wv.nativeView){return wv.once('loaded',()=>this.ngAfterViewInit());}
    // TODO: https://github.com/NativeScript/nativescript-angular/issues/848

    switch (this.platformProvider.name) {
      case 'Android':
        const WebChromeClient = WebChromeClientFactory();
        const WebViewClient = WebViewClientFactory(this.navigate.bind(this));

        wv = wv.android;
        wv.getSettings().setGeolocationEnabled(true);
        wv.getSettings().setJavaScriptEnabled(true);
        wv.setWebChromeClient(new WebChromeClient());
        wv.setWebViewClient(new WebViewClient());
        return;

      case 'iOS':
        wv = wv.ios;
        // TODO: https://board.codeschluss.de/project/wooportal/us/37
        return;
    }
  }

  private navigate(url: string): void {
    if (!url.startsWith(this.router.url)) {
      this.zone.run(() => this.router.navigateByUrl(url));
    }
  }

}
