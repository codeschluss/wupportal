import { DOCUMENT } from '@angular/common';
import { HttpRequest } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { ActivatedRoute, NavigationStart, Route, Router, RouterEvent } from '@angular/router';
import { CrudJoiner, CrudResolver, LoadingProvider, PositionProvider, ReadParams, Selfrouter } from '@wooportal/core';
import * as ColorConvert from 'color-convert';
import { LayerVectorComponent, MapComponent, ViewComponent } from 'ngx-openlayers';
import { Feature, MapBrowserPointerEvent } from 'ol';
import { GeometryFunction, Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Fill, Icon, Style, StyleFunction, Text } from 'ol/style';
import { BehaviorSubject, EMPTY, forkJoin, Observable, of, Subscription } from 'rxjs';
import { catchError, filter, mergeMap, tap } from 'rxjs/operators';
import { ActivityModel } from '../../realm/models/activity.model';
import { ConfigurationModel } from '../../realm/models/configuration.model';
import { ActivityProvider } from '../../realm/providers/activity.provider';
import { MapsConnection } from './maps.connection';

@Component({
  styleUrls: ['maps.component.scss'],
  templateUrl: 'maps.component.html'
})

export class MapsComponent
  extends Selfrouter implements OnInit, AfterViewInit, OnDestroy {

  public followed: Subscription = EMPTY.subscribe();

  public focus: BehaviorSubject<ActivityModel[]>;

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

  private block: HttpRequest<any> = Object.create(HttpRequest);

  private connection: MapsConnection;

  private joiner: CrudJoiner = CrudJoiner.of(ActivityModel)
    .with('address').yield('suburb')
    .with('category')
    .with('schedules');

  @ViewChild('center', { read: ElementRef, static: true })
  private center: ElementRef<HTMLElement>;

  @ViewChild('dialer', { read: ElementRef, static: true })
  private dialer: ElementRef<HTMLElement>;

  @ViewChild('fill', { static: true })
  private fill: MatButton;

  @ViewChild('follow', { static: true })
  private follow: MatButton;

  @ViewChild(MatRipple, { static: true })
  private location: MatRipple;

  @ViewChild(MapComponent, { static: true })
  private maps: MapComponent;

  @ViewChild(LayerVectorComponent, { static: true })
  private vector: LayerVectorComponent;

  @ViewChild(ViewComponent, { static: true })
  private view: ViewComponent;

  public get cards(): boolean {
    const params = this.route.snapshot.queryParamMap;
    return this.filled || !(params.has('embed') || params.has('items'));
  }

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

  public get native(): boolean {
    return this.route.snapshot.queryParamMap.has('native');
  }

  public constructor(
    private activityProvider: ActivityProvider,
    private crudResolver: CrudResolver,
    @Inject(DOCUMENT) private document: Document,
    private element: ElementRef<HTMLElement>,
    private loadingProvider: LoadingProvider,
    private positionProvider: PositionProvider,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.focus = new BehaviorSubject<ActivityModel[]>([]);
    this.items = new BehaviorSubject<ActivityModel[]>([]);
    this.loadingProvider.enqueue(this.block);

    this.mapconf = {
      geomFn: this.geometry.bind(this),
      styleFn: this.styling.bind(this),

      cluster: parseFloat(this.configuration('mapCluster')),
      latitude: parseFloat(this.configuration('mapLatitude')),
      longitude: parseFloat(this.configuration('mapLongitude')),
      projection: this.configuration('mapProjection'),
      zoomfactor: parseFloat(this.configuration('mapZoomfactor'))
    };

    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event: RouterEvent) => {
      if (this.connection) {
        this.connection.nextRoute(event.url);
      } else if (this.native) {
        this.document.defaultView.location.href = event.url;
      } else if (this.route.snapshot.queryParamMap.has('embed')) {
        this.router.navigate(this.route.snapshot.url);
      }
    });
  }

  public ngAfterViewInit(): void {
    const params = this.route.snapshot.queryParamMap;
    const source = this.document.defaultView;

    this.focus.subscribe(() => this.vector.instance.changed());
    this.maps.onSingleClick.subscribe((event) => this.handleClick(event));
    this.maps.instance.getInteractions().forEach((i) => i.setActive(false));
    this.maps.instance.once('postrender', (e) => e.target.updateSize());
    this.maps.instance.once('rendercomplete', () => {
      this.maps.instance.getInteractions().forEach((i) => i.setActive(true));
      this.dialer.nativeElement.style.transform = 'scale(1)';
      this.loadingProvider.finished(this.block);
    });

    if (params.has('items')) {
      this.maps.instance.getInteractions().clear();
      this.filter(params.getAll('items')).subscribe((items) => {
        this.focus.next(items);
        this.items.next(items);
      });
    } else if (source !== source.parent) {
      this.connection = new MapsConnection(source, source.parent);
      this.connection.focus.subscribe((focus) => this.focus.next(focus));
      this.connection.items.subscribe((items) => this.items.next(items));
      this.connection.nextReady(true);
    } else {
      this.fetch().subscribe((items) => this.items.next(items));
    }
  }

  public ngOnDestroy(): void {
    this.loadingProvider.finished(this.block);
  }

  public handleClick(event: MapBrowserPointerEvent): void {
    if (!this.route.snapshot.queryParamMap.has('items')) {
      const feature = this.maps.instance.getFeaturesAtPixel(event.pixel);
      const items = !feature ? [] : feature[0].get('features').map((feat) =>
        this.items.value.find((item) => item.id === feat.getId()));

      this.focus.next(items);

      if (this.connection) {
        this.connection.nextFocus(items);
      }
    }
  }

  public handleFill(): void {
    this.filling(!this.filled);
  }

  public handleFollow(): void {
    this.following(this.followed.closed);
  }

  public handleReset(): void {
    this.following(false);

    if (this.route.snapshot.queryParamMap.has('items')) {
      this.filter(this.route.snapshot.queryParamMap.getAll('items'))
        .subscribe((items) => this.focus.next(items));
    } else {
      this.view.instance.animate({
        center: fromLonLat([
          this.mapconf.longitude,
          this.mapconf.latitude
        ]),
        rotation: 0,
        zoom: this.mapconf.zoomfactor
      });
    }
  }

  private configuration(item: string): string {
    return this.route.snapshot.data.configuration
      .find((config) => config.item === item).value;
  }

  private fetch(params?: ReadParams): Observable<ActivityModel[]> {
    params = Object.assign({
      current: true,
      embeddings: CrudJoiner.to(this.joiner.graph)
    }, params);

    return this.activityProvider.readAll(params).pipe(
      mergeMap((items) => this.crudResolver.refine(items, this.joiner.graph)),
      catchError(() => of([]))
    ) as Observable<ActivityModel[]>;
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

  private filter(ids: string[]): Observable<ActivityModel[]> {
    return forkJoin(ids.map((id) => this.activityProvider.readOne(id).pipe(
      mergeMap((item) => this.crudResolver.refine(item, this.joiner.graph))
    ))).pipe(tap((items: ActivityModel[]) => {
      const latitude = items.reduce((num, i) => num += i.address.latitude, 0);
      const longitude = items.reduce((num, i) => num += i.address.longitude, 0);

      this.view.instance.animate({
        center: fromLonLat([
          longitude / items.length,
          latitude / items.length
        ]),
        rotation: 0,
        zoom: 17.5
      });
    })) as Observable<ActivityModel[]>;
  }

  private following(enable: boolean): void {
    if (enable) {
      this.maps.instance.getInteractions().forEach((i) => i.setActive(false));
      this.followed = this.positionProvider.locate().subscribe((coords) => {
        this.center.nativeElement.classList.add('show');
        this.follow.ripple.launch({ centered: true });
        this.location.launch({ centered: true });
        this.view.instance.animate({
          center: fromLonLat([
            coords.longitude,
            coords.latitude
          ]),
          duration: 1000,
          zoom: 17.5
        });

        if (this.route.snapshot.queryParamMap.has('items')) {
          this.center.nativeElement.classList.add('arrow');
          this.center.nativeElement.style.transform = `rotate(${Math.atan2(
            coords.latitude - 1 / this.focus.value.length * this.focus.value
              .reduce((num, i) => num += i.address.latitude, 0),
            coords.longitude - 1 / this.focus.value.length * this.focus.value
              .reduce((num, i) => num += i.address.longitude, 0)
          ) * -180 / Math.PI}deg)`;
        }
      }, () => {
        this.following(false);
        this.follow.disabled = true;
      });
    } else {
      this.followed.unsubscribe();
      this.center.nativeElement.classList.remove('arrow', 'show');
      this.maps.instance.getInteractions().forEach((i) => i.setActive(true));
    }
  }

  private geometry(feature: Feature): Point {
    const point = feature.getGeometry();
    return point && point instanceof Point ? point : null;
  }

  private styling(feature: Feature): Style {
    const focus = this.focus.value.map((i) => i.id);
    const items = feature.get('features').map((feat) =>
      this.items.value.find((item) => item.id === feat.getId()));

    const rgb = items.map((item) => {
      return ColorConvert.keyword.rgb(item.category.color)
        || ColorConvert.hex.rgb(item.category.color);
    });

    const multi = rgb.length > 1;
    const focused = items.some((i) => focus.includes(i.id));
    const r = rgb.reduce((i, j) => i + j[0], 0) / rgb.length;
    const g = rgb.reduce((i, j) => i + j[1], 0) / rgb.length;
    const b = rgb.reduce((i, j) => i + j[2], 0) / rgb.length;
    const color = r + g + b > 382 ? '#000' : '#FFF';

    return new Style({
      image: new Icon({
        color: '#' + ColorConvert.rgb.hex(r, g, b),
        src: `/images/pin-${multi ? 'full' : 'hole'}.png`,

        anchor: [.5, 1],
        imgSize: [60, 96],
        scale: focused ? .66 : .5
      }),
      text: multi && new Text({
        fill: new Fill({ color }),
        font: 'bold 16px monospace',
        text: rgb.length.toString(),
        textAlign: 'center',

        offsetY: focused ? -40 : -30,
        scale: focused ? 1.33 : 1
      })
    });
  }

}
