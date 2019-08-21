import { HttpRequest } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoadingProvider, PlatformProvider, Selfrouter } from '@wooportal/core';
import { fromEvent } from 'rxjs';
import { LoadEventData, WebView } from 'tns-core-modules/ui/web-view';
import { ClientPackage } from '../../utils/package';

@Component({
  styleUrls: ['maps.component.scss'],
  templateUrl: 'maps.component.html'
})

export class MapsComponent
  extends Selfrouter implements OnInit, AfterViewInit, OnDestroy {

  protected routing: Route = {
    path: ''
  };

  private block: HttpRequest<any> = Object.create(HttpRequest);

  @ViewChild('webview', { read: ElementRef, static: true })
  private webview: ElementRef<WebView>;

  public get source(): string {
    return `${ClientPackage.config.defaults.appUrl}/mapview?embed=native`;
  }

  public constructor(
    private loadingProvider: LoadingProvider,
    private platformProvider: PlatformProvider,
    private router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.loadingProvider.enqueue(this.block);
    this.webview.nativeElement.once('loadFinished', () =>
      this.loadingProvider.finished(this.block));
  }

  public ngAfterViewInit(): void {
    const wv = this.webview.nativeElement;
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
        wv.android.getSettings().setGeolocationEnabled(true);
        wv.android.getSettings().setJavaScriptEnabled(true);
        return;

      case 'iOS':
        // TODO: https://board.codeschluss.de/project/wooportal/us/37
        return;
    }
  }

  public ngOnDestroy(): void {
    this.loadingProvider.finished(this.block);
  }

}
