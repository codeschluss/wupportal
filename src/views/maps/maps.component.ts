import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver, PositionProvider, Selfrouter } from '@wooportal/core';
import * as colorConvert from 'color-convert';
import { MapComponent, ViewComponent } from 'ngx-openlayers';
import { Feature, MapBrowserPointerEvent } from 'ol';
import { GeometryFunction, Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Fill, Icon, Style, StyleFunction, Text } from 'ol/style';
import { BehaviorSubject, EMPTY, Observable, Subscription } from 'rxjs';
import { ActivityModel } from '../../realm/models/activity.model';
import { ConfigurationModel } from '../../realm/models/configuration.model';

@Component({
  styleUrls: ['maps.component.scss'],
  templateUrl: 'maps.component.html'
})

export class MapsComponent extends Selfrouter implements OnInit, AfterViewInit {

  public followed: Subscription = EMPTY.subscribe();

  public items: BehaviorSubject<ActivityModel[]>;

  public mapconf: {
    geomFn: GeometryFunction;
    styleFn: StyleFunction;

    cluster: number;
    latitude: number;
    longitude: number;
    projection: string;
    zoomfactor: number;
  };

  protected routing: Route = {
    path: '',
    resolve: {
      configuration: CrudResolver
    },
    data: {
      resolve: {
        configuration: CrudJoiner.of(ConfigurationModel)
      }
    }
  };

  @ViewChild(MatRipple, { static: true })
  private center: MatRipple;

  @ViewChild('dialer', { read: ElementRef, static: true })
  private dialer: ElementRef<HTMLElement>;

  @ViewChild('fill', { static: true })
  private fill: MatButton;

  @ViewChild('follow', { static: true })
  private follow: MatButton;

  @ViewChild(MapComponent, { static: true })
  private maps: MapComponent;

  @ViewChild(ViewComponent, { static: true })
  private view: ViewComponent;

  public get filled(): boolean {
    switch (true) {
      case 'fullscreenElement' in this.document:
        return (this.document as any).fullscreenElement !== null;
      case 'webkitFullscreenElement' in this.document:
        return (this.document as any).webkitFullscreenElement !== null;
      case 'mozFullScreenElement' in this.document:
        return (this.document as any).mozFullScreenElement !== null;
      case 'msFullscreenElement' in this.document:
        return (this.document as any).msFullscreenElement !== null;
    }
  }

  public constructor(
    @Inject(DOCUMENT) private document: Document,
    private element: ElementRef<HTMLElement>,
    private positionProvider: PositionProvider,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.items = new BehaviorSubject<ActivityModel[]>([]);

    this.mapconf = {
      geomFn: this.geometry.bind(this),
      styleFn: this.styling.bind(this),

      cluster: parseFloat(this.configuration('mapCluster')),
      latitude: parseFloat(this.configuration('mapLatitude')),
      longitude: parseFloat(this.configuration('mapLongitude')),
      projection: this.configuration('mapProjection'),
      zoomfactor: parseFloat(this.configuration('mapZoomfactor'))
    };

    if (this.route.snapshot.queryParams.embed === 'true') {
      this.document.body.classList.add('embedded');
    }
  }

  public ngAfterViewInit(): void {
    this.maps.onSingleClick.subscribe((event) => this.handleClick(event));
    this.maps.instance.once('postcompose', (e) => e.target.updateSize());
    this.maps.instance.once('rendercomplete', () =>
      this.dialer.nativeElement.style.transform = 'scale(1)');

    if (parent !== window) {
      this.postMessage({ items: null });
    }
  }

  public handleClick(event: MapBrowserPointerEvent): void {
    console.log(this.maps.instance.getFeaturesAtPixel(event.pixel));
  }

  public handleFill(): void {
    this.filling(!this.filled);
  }

  public handleFollow(): void {
    this.following(this.followed.closed);
  }

  @HostListener('window:message', ['$event'])
  public handleMessage(event: MessageEvent): void {
    Object.keys(event.data).forEach((key) => {
      switch (key) {
        case 'focus': return console.log('focus', event.data[key]);
        case 'items': return !event.data[key]
          ? this.postMessage({ items: this.items })
          : this.items.next(event.data[key]);
      }
    });
  }

  public handleReset(): void {
    this.following(false);
    this.view.instance.animate({
      center: fromLonLat([
        this.mapconf.longitude,
        this.mapconf.latitude
      ]),
      rotation: 0,
      zoom: this.mapconf.zoomfactor
    });
  }

  private configuration(item: string): string {
    return this.route.snapshot.data.configuration
      .find((config) => config.item === item).value;
  }

  private filling(enable: boolean): void {
    try {
      if (enable) {
        const elem = this.element.nativeElement as any;

        switch (true) {
          case typeof elem.mozRequestFullScreen === 'function':
            return elem.mozRequestFullScreen();
          case typeof elem.msRequestFullscreen === 'function':
            return elem.msRequestFullscreen();
          case typeof elem.requestFullscreen === 'function':
            return elem.requestFullscreen();
          case typeof elem.webkitRequestFullscreen === 'function':
            return elem.webkitRequestFullscreen();
        }
      } else {
        const elem = this.document as any;

        switch (true) {
          case typeof elem.exitFullscreen === 'function':
            return elem.exitFullscreen();
          case typeof elem.msExitFullscreen === 'function':
            return elem.msExitFullscreen();
          case typeof elem.mozCancelFullScreen === 'function':
            return elem.mozCancelFullScreen();
          case typeof elem.webkitExitFullscreen === 'function':
            return elem.webkitExitFullscreen();
        }
      }
    } catch {
      this.fill.disabled = true;
    }
  }

  private following(enable: boolean): void {
    if (enable) {
      this.maps.instance.getInteractions().forEach((i) => i.setActive(false));
      this.followed = this.positionProvider.locate().subscribe((coords) => {
        this.follow.ripple.launch({ centered: true });
        this.center.launch({ centered: true });
        this.view.instance.animate({
          center: fromLonLat([
            coords.longitude,
            coords.latitude
          ]),
          duration: 1000,
          zoom: 17.5
        });
      }, () => {
        this.following(false);
        this.follow.disabled = true;
      });
    } else {
      this.followed.unsubscribe();
      this.maps.instance.getInteractions().forEach((i) => i.setActive(true));
    }
  }

  private geometry(feature: Feature): Point {
    const point = feature.getGeometry();
    return point && point instanceof Point ? point : null;
  }

  private postMessage(message: any): void {
    const data = JSON.parse(JSON.stringify(message, (key, value) =>
      key.startsWith('_') || value instanceof Observable ? undefined : value));

    parent.postMessage(data, window.origin);
  }

  private styling(feature: Feature): Style {
    const colors = feature.get('features').map((feat) => {
      const item = this.items.value.find((i) => i.id === feat.getId());

      return colorConvert.keyword.rgb(item.category.color)
        || colorConvert.hex.rgb(item.category.color);
    });

    const multi = colors.length > 1;
    const r = colors.reduce((i, j) => i + j[0], 0) / colors.length;
    const g = colors.reduce((i, j) => i + j[1], 0) / colors.length;
    const b = colors.reduce((i, j) => i + j[2], 0) / colors.length;
    const fontColor = { color: r + g + b > 382 ? '#000' : '#FFF' };

    return new Style({
      image: new Icon({
        color: '#' + colorConvert.rgb.hex(r, g, b),
        src: `/imgs/pin-${multi ? 'full' : 'hole'}.png`,

        anchor: [.5, 1],
        imgSize: [60, 96],
        scale: 1 / 2
      }),
      text: multi && new Text({
        fill: new Fill(fontColor),
        font: 'bold 1rem monospace',
        text: colors.length.toString(),
        textAlign: 'center',

        offsetY: -30
      })
    });
  }

}
