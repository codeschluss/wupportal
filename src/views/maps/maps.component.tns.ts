import { HttpRequest } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoadingProvider, PlatformProvider, Selfrouter } from '@wooportal/core';
import { LoadEventData, WebView } from 'tns-core-modules/ui/web-view';
import { ClientPackage } from '../../utils/package';

@Component({
  styleUrls: ['maps.component.scss'],
  templateUrl: 'maps.component.html'
})

export class MapsComponent extends Selfrouter
  implements OnInit, AfterViewInit {

  protected routing: Route = {
    path: ''
  };

  @ViewChild('webview', { read: ElementRef, static: true })
  private webview: ElementRef<WebView>;

  public get source(): string {
    return `${ClientPackage.config.defaults.appUrl}/maps?embed=native`;
  }

  public constructor(
    private loadingProvider: LoadingProvider,
    private platformProvider: PlatformProvider,
    private router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    const request = Object.create(HttpRequest);
    this.loadingProvider.enqueue(request);
    this.webview.nativeElement.once('loadFinished', () =>
      this.loadingProvider.finished(request));
  }

  public ngAfterViewInit(): void {
    const wv = this.webview.nativeElement;
    const url = ClientPackage.config.defaults.appUrl;

    // tslint:disable-next-line
    if(!wv.nativeView){return wv.once('loaded',()=>this.ngAfterViewInit());}
    // TODO: https://github.com/NativeScript/nativescript-angular/issues/848

    wv.on('loadStarted', (event: LoadEventData) => {
      if (event.url !== this.source) {
        wv.stopLoading();
        wv.disposeNativeView();

        if (event.url.startsWith(url)) {
          this.router.navigateByUrl(event.url.replace(url, ''));
        }
      }
    });

    switch (this.platformProvider.name) {
      case 'Android':
        wv.android.getSettings().setJavaScriptEnabled(true);
        return;

      case 'iOS':
        // TODO: BUY_MAC
        return;
    }
  }

}
