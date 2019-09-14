import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PlatformProvider, Selfrouter } from '@wooportal/core';
import { fromEvent } from 'rxjs';
import { LoadEventData, WebView } from 'tns-core-modules/ui/web-view';
import { ClientPackage } from '../../utils/package';

@Component({
  styleUrls: ['maps.component.scss'],
  templateUrl: 'maps.component.html'
})

export class MapsComponent
  extends Selfrouter implements AfterViewInit {

  protected routing: Route = {
    path: ''
  };

  @ViewChild('webview', { read: ElementRef, static: true })
  private webview: ElementRef<WebView>;

  public get source(): string {
    return `${ClientPackage.config.defaults.appUrl}/mapview?native`;
  }

  public constructor(
    private platformProvider: PlatformProvider,
    private router: Router
  ) {
    super();
  }

  public ngAfterViewInit(): void {
    let wv = this.webview.nativeElement as any;
    const url = ClientPackage.config.defaults.appUrl;

    // tslint:disable-next-line
    if(!wv.nativeView){return wv.once('loaded',()=>this.ngAfterViewInit());}
    // TODO: https://github.com/NativeScript/nativescript-angular/issues/848

    fromEvent(wv, 'loadStarted').subscribe((event: LoadEventData) => {
      if (event.url !== this.source) {
        wv.style.visibility = 'hidden';
        wv.stopLoading();

        if (event.url.startsWith(url)) {
          this.router.navigateByUrl(event.url.replace(url, ''));
        }
      }
    });

    switch (this.platformProvider.name) {
      case 'Android':
        wv = wv.android;
        wv.getSettings().setGeolocationEnabled(true);
        wv.getSettings().setJavaScriptEnabled(true);
        return;

      case 'iOS':
        // TODO: https://board.codeschluss.de/project/wooportal/us/37
        return;
    }
  }

}
