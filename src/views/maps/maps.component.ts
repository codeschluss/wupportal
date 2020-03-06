import { HttpRequest } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { ActivatedRoute, NavigationStart, Route, Router, RouterEvent } from '@angular/router';
import { DeviceProvider } from '@wooportal/app';
import { CrudJoiner, CrudResolver, LoadingProvider, PositionProvider, Selfrouter } from '@wooportal/core';
import * as ColorConvert from 'color-convert';
import { LayerVectorComponent, MapComponent, ViewComponent } from 'ngx-openlayers';
import { Feature, MapBrowserPointerEvent } from 'ol';
import { GeometryFunction, Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Fill, Icon, Style, StyleFunction, Text } from 'ol/style';
import { BehaviorSubject, EMPTY, Observable, of, Subscription } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { ActivityModel } from '../../base/models/activity.model';
import { ConfigurationModel } from '../../base/models/configuration.model';
import { ActivityProvider } from '../../base/providers/activity.provider';
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
    path: '**',
    pathMatch: 'full',
    resolve: {
      configuration: CrudResolver
    },
    data: {
      resolve: {
        configuration: CrudJoiner.of(ConfigurationModel, {
          required: true
        })
      }
    },
    runGuardsAndResolvers: 'always'
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

  public get embed(): boolean {
    return this.route.snapshot.queryParamMap.has('embed');
  }

  public get uuid(): string | undefined {
    return (this.route.snapshot.url[0] || { } as any).path;
  }

  public constructor(
    private activityProvider: ActivityProvider,
    private crudResolver: CrudResolver,
    private deviceProvider: DeviceProvider,
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
        this.router.navigateByUrl(this.router.url);
      } else if (this.route.snapshot.queryParamMap.has('native')) {
        this.deviceProvider.document.defaultView.location.href = event.url;
      }
    });
  }

  public ngAfterViewInit(): void {
    const source = this.deviceProvider.document.defaultView;

    this.focus.subscribe(() => this.vector.instance.changed());
    this.maps.singleClick.subscribe((event) => this.handleClick(event));
    this.maps.pointerMove.subscribe((event) => this.handleCursor(event));
    this.maps.instance.getInteractions().forEach((i) => i.setActive(false));
    this.maps.instance.once('postrender', (e) => e.target.updateSize());
    this.maps.instance.once('rendercomplete', () => {
      this.maps.instance.getInteractions().forEach((i) => i.setActive(true));
      this.dialer.nativeElement.style.transform = 'scale(1)';
      this.loadingProvider.finished(this.block);
    });

    if (source !== source.parent) {
      this.connection = new MapsConnection(source, source.parent);
      this.connection.focus.subscribe((focus) => this.focus.next(focus));
      this.connection.items.subscribe((items) => this.items.next(items));
      this.connection.nextReady(true);
    }

    if (this.embed) {
      this.maps.instance.getInteractions().clear();
    }

    this.route.url.pipe(
      mergeMap(() => this.fetch())
    ).subscribe(() => this.handleReset());
  }

  public ngOnDestroy(): void {
    this.loadingProvider.finished(this.block);
  }

  public handleClick(event: MapBrowserPointerEvent): void {
    if (!this.uuid) {
      const features = this.maps.instance.getFeaturesAtPixel(event.pixel);

      if (features.length) {
        this.focus.next(features[0].get('features').map((feature) =>
          this.items.value.find((item) => item.id === feature.getId())));
      } else {
        this.focus.next([]);
      }

      if (this.connection) {
        this.connection.nextFocus(this.focus.value);
      }
    }
  }

  public handleCursor(event: MapBrowserPointerEvent): void {
    if (!event.dragging) {
      const feats = this.maps.instance.hasFeatureAtPixel(event.pixel);
      this.element.nativeElement.style.cursor = feats ? 'pointer' : null;
    }
  }

  public handleFollow(): void {
    this.following(this.followed.closed);
  }

  public handleNavigation(item: ActivityModel): void {
    console.log(item);
  }

  public handleReset(): void {
    const items = this.items.value;
    this.focus.next(items.length > 1 ? [] : items);
    this.following(false);

    this.view.instance.animate({
      center: fromLonLat([
        items.length
          ? items.reduce((l, i) => l += i.address.longitude, 0) / items.length
          : this.mapconf.longitude,
        items.length
          ? items.reduce((l, i) => l += i.address.latitude, 0) / items.length
          : this.mapconf.latitude
      ]),
      rotation: 0,
      zoom: items.length > 1 ? this.mapconf.zoomfactor : 17.5
    });
  }

  private configuration(item: string): string {
    return this.route.snapshot.data.configuration
      .find((config) => config.item === item).value;
  }

  private fetch(): Observable<ActivityModel[]> {
    if (this.uuid) {
      return this.activityProvider.readOne(this.uuid).pipe(
        mergeMap((item) => this.crudResolver.refine(item, this.joiner.graph)),
        map((item) => [item]),
        tap(((item: ActivityModel[]) => {
          this.focus.next(item);
          this.items.next(item);
        }))
      );
    } else {
      return this.activityProvider.readAll({
        current: true,
        embeddings: CrudJoiner.to(this.joiner.graph)
      }).pipe(
        mergeMap((items) => this.crudResolver.refine(items, this.joiner.graph)),
        catchError(() => of([])),
        tap((items: ActivityModel[]) => this.items.next(items))
      );
    }
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

        if (this.uuid) {
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
