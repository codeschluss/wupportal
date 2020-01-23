import { AfterViewInit, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { PlatformProvider } from '@wooportal/core';
import { WebView } from 'tns-core-modules/ui/web-view';
import { MarkedCompat } from './marked.compat.i';

@Component({
  selector: 'marked-compat',
  template: `
    <WebView #webview margin="-8" [src]="html"></WebView>
  `
})

export class MarkedCompatComponent implements MarkedCompat, AfterViewInit {

  @HostBinding('attr.compat')
  public readonly compat: string = 'marked';

  @Input()
  public data: string;

  public get html(): string {
    return '<style>body{font-family:sans-serif;}</style>' + this.data;
  }

  @ViewChild('webview', { read: ElementRef, static: true })
  private webview: ElementRef<WebView>;

  public constructor(
    private platformProvider: PlatformProvider
  ) { }

  public ngAfterViewInit(): void {
    let wv = this.webview.nativeElement as any;

    // tslint:disable-next-line
    if(!wv.nativeView){return wv.once('loaded',()=>this.ngAfterViewInit());}
    // TODO: https://github.com/NativeScript/nativescript-angular/issues/848

    switch (this.platformProvider.name) {
      case 'Android':
        wv = wv.android;
        wv.setBackgroundColor(0x00000000);
        wv.getSettings().setSupportZoom(false);
        wv.setWebViewClient(new this.platformProvider.viewClient());
        break;

      case 'iOS':
        wv.ios.opaque = false;
        wv.ios.setDrawsBackground = false;
        wv.on('loadStarted', (e) => this.platformProvider.resourceClient(e));
        wv.on('loadFinished', (e) => this.platformProvider.resizeClient(e));
        break;
    }
  }

}
