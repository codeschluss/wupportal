import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { filter } from 'rxjs';
import { PlatformProvider, RoutingComponent } from '../../../core';
import { MapsConnection } from '../../maps/maps.connection';

@Component({
  styleUrls: ['map.component.sass'],
  templateUrl: 'map.component.html'
})

export class MapComponent
  extends RoutingComponent
  implements OnInit, AfterViewInit {

  public source: SafeResourceUrl | string;

  @ViewChild('frame', { read: ElementRef, static: true })
  private frame: ElementRef<HTMLIFrameElement>;

  private mapview: MapsConnection;

  protected get routing(): Route {
    return {
      path: 'map',
      children: [
        {
          path: ''
        },
        {
          path: ':type'
        }
      ]
    };
  }

  public constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private platformProvider: PlatformProvider
  ) {
    super();
  }

  public ngOnInit(): void {
    this.source = this.sanitizer.bypassSecurityTrustResourceUrl(
      ['android', 'ios'].includes(this.platformProvider.name)
        ? '#/mapview/?embed=true'
        : '/mapview/?embed=true'
    );
  }

  public ngAfterViewInit(): void {
    if (this.platformProvider.name !== 'server') {
      const main = this.platformProvider.document.defaultView;
      const frame = this.frame.nativeElement.contentWindow;

      this.mapview = new MapsConnection(main, frame);
      this.mapview.focus.subscribe(console.log);
      this.mapview.route.subscribe(console.log);
      this.mapview.ready.pipe(filter(Boolean)).subscribe(console.log);
      this.mapview.nextReady(true);
    }
  }

  public active(href: string): boolean {
    return this.router.url.startsWith(['', this.routing.path, href].join('/'));
  }

}
