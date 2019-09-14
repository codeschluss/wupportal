import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { PlatformProvider } from '@wooportal/core';
import * as ColorConvert from 'color-convert';
import { isKnownView, registerElement } from 'nativescript-angular/element-registry';
import { ContentView } from 'tns-core-modules/ui/page';
import { WebView } from 'tns-core-modules/ui/web-view';
import { IconCompat } from './icon.compat.i';

if (!isKnownView('icon-compat')) {
  registerElement('icon-compat', () => ContentView);
}

@Component({
  selector: 'icon-compat',
  template: `
    <WebView #webview [src]="source" (tap)="true"></WebView>
  `
})

// TODO: https://github.com/NativeScript/NativeScript/issues/944
export class IconCompatComponent implements IconCompat, AfterViewInit {

  @HostBinding('attr.compat')
  public readonly compat: string = 'icon';

  @Input()
  public icon: string;

  @Input()
  public pack: string = 'fas';

  @ViewChild('webview', { read: ElementRef, static: true })
  private webview: ElementRef<WebView>;

  public get source(): string {
    const color = this.webview.nativeElement.style.color;

    return icon(this.iconLibrary.getIconDefinition(
      this.pack as any,
      this.icon as any
    ), {
      styles: {
        color: color ? ColorConvert.rgb.hex(color.r, color.g, color.b) : '#000',
        'fill-opacity': color ? (color.a / 255).toString() : '100%',
      }
    }).html.join('');
  }

  public constructor(
    private changeDetection: ChangeDetectorRef,
    private iconLibrary: FaIconLibrary,
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
        this.changeDetection.detectChanges();
        wv.setBackgroundColor(0x00000000);
        wv.setHorizontalScrollBarEnabled(false);
        wv.setVerticalScrollBarEnabled(false);
        wv.getSettings().setSupportZoom(false);
        return;

      case 'iOS':
        // TODO: https://board.codeschluss.de/project/wooportal/us/37
        wv = wv.ios;
        wv.opaque = false;
        wv.setDrawsBackground = false;
        wv.showsHorizontalScrollIndicator = false;
        wv.showsVerticalScrollIndicator = false;
        return;
    }
  }

}
