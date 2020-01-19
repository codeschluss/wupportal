import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route } from '@angular/router';
import { PlatformProvider, Selfrouter } from '@wooportal/core';
import { WebView } from 'tns-core-modules/ui/web-view';
import { ClientPackage } from '../../utils/package';
import { geolocation } from '../shared/shared.imports';

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
    private platformProvider: PlatformProvider
  ) {
    super();
  }

  public ngOnInit(): void {
    geolocation.enableLocationRequest().catch(() => { });
  }

  public ngAfterViewInit(): void {
    let wv = this.webview.nativeElement as any;

    // tslint:disable-next-line
    if(!wv.nativeView){return wv.once('loaded',()=>this.ngAfterViewInit());}
    // TODO: https://github.com/NativeScript/nativescript-angular/issues/848

    switch (this.platformProvider.name) {
      case 'Android':
        wv = wv.android;
        wv.getSettings().setGeolocationEnabled(true);
        wv.getSettings().setJavaScriptEnabled(true);
        wv.setWebChromeClient(new this.platformProvider.chromeClient());
        wv.setWebViewClient(new this.platformProvider.viewClient());
        break;

      case 'iOS':
        wv.on('loadStarted', (e) => this.platformProvider.resourceClient(e));
        break;
    }
  }

}
