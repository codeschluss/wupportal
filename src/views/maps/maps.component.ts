import { HttpRequest } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatRipple } from '@angular/material/core';
import { ActivatedRoute, NavigationStart, Route, Router, RouterEvent } from '@angular/router';
import * as ColorConvert from 'color-convert';
import { LayerVectorComponent, MapComponent, ViewComponent } from 'ngx-openlayers';
import { Feature, MapBrowserPointerEvent } from 'ol';
import { GeometryFunction, Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Fill, Icon, Style, StyleFunction, Text } from 'ol/style';
import { BehaviorSubject, EMPTY, Observable, of, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, mergeMap, startWith, take, tap } from 'rxjs/operators';
import * as smoothPolyline from 'smooth-polyline';
import { ActivityModel, ActivityProvider, ConfigurationModel, CrudGraph, CrudJoiner, CrudResolver, LoadingProvider, LocationProvider, OrganisationModel, OrganisationProvider, PlatformProvider, PositionProvider, RoutingComponent } from '../../core';
import { MapModel, MapsConnection } from './maps.connection';

@Component({
  styleUrls: ['maps.component.sass'],
  templateUrl: 'maps.component.html'
})

export class MapsComponent
  extends RoutingComponent
  implements OnInit, AfterViewInit, OnDestroy {

  public directions: [number, number][];

  public enabled: boolean = true;

  public activities: Observable<ActivityModel[]>;

  public organisations: Observable<OrganisationModel[]>;

  public focus: BehaviorSubject<MapModel[]>;

  public items: BehaviorSubject<MapModel[]>;

  public location: Subscription = EMPTY.subscribe();

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
    }
  };

  private block: HttpRequest<any> = Object.create(HttpRequest);

  private connection: MapsConnection;

  private graph: Record<string, CrudGraph> = {
    activity: CrudJoiner.of(ActivityModel)
      .with('address')
      .with('category')
      .with('provider').yield('organisation')
      .with('schedules')
      .with('titleImage')
    .graph,
    organisation: CrudJoiner.of(OrganisationModel, {
      approved: true
    })
      .with('address')
      .with('avatar')
    .graph
  };

  @ViewChild('center', { read: ElementRef, static: true })
  private center: ElementRef<HTMLElement>;

  @ViewChild('dialer', { read: ElementRef, static: true })
  private dialer: ElementRef<HTMLElement>;

  @ViewChild(MapComponent, { static: true })
  private maps: MapComponent;

  @ViewChild(MatRipple, { static: true })
  private ripple: MatRipple;

  @ViewChild(MatButtonToggleGroup, { static: false })
  private type: MatButtonToggleGroup;

  @ViewChild(LayerVectorComponent, { static: true })
  private vector: LayerVectorComponent;

  @ViewChild(ViewComponent, { static: true })
  private view: ViewComponent;

  public get embedded(): boolean {
    return this.route.snapshot.queryParamMap.has('embed');
  }

  public get navigate(): boolean {
    return this.focus.value.length && this.focus.value.every((item) =>
      item.address.latitude === this.focus.value[0].address.latitude &&
      item.address.longitude === this.focus.value[0].address.longitude
    );
  }

  public get uuid(): string | undefined {
    return this.route.snapshot.url[1]?.path;
  }

  public constructor(
    private activityProvider: ActivityProvider,
    private crudResolver: CrudResolver,
    private element: ElementRef<HTMLElement>,
    private loadingProvider: LoadingProvider,
    private locationProvider: LocationProvider,
    private organisationProvider: OrganisationProvider,
    private platformProvider: PlatformProvider,
    private positionProvider: PositionProvider,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  public ngOnInit(): void {
    this.focus = new BehaviorSubject<MapModel[]>([]);
    this.items = new BehaviorSubject<MapModel[]>([]);
    this.loadingProvider.enqueue(this.block);

    this.activities = this.focus.pipe(filter((items) => {
      return items.every((item) => item instanceof ActivityModel);
    })) as Observable<ActivityModel[]>;

    this.organisations = this.focus.pipe(filter((items) => {
      return items.every((item) => item instanceof OrganisationModel);
    })) as Observable<OrganisationModel[]>;

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
      }
    });
  }

  public ngAfterViewInit(): void {
    this.focus.subscribe(() => this.vector.instance.changed());
    this.items.subscribe(() => this.handleReset());

    this.maps.instance.getInteractions().forEach((i) => i.setActive(false));
    this.maps.instance.once('postrender', (e) => e.target.updateSize());
    this.maps.instance.once('rendercomplete', () => {
      this.maps.instance.getInteractions().forEach((i) => i.setActive(true));
      this.dialer.nativeElement.style.transform = 'scale(1)';
      this.loadingProvider.finished(this.block);
    });

    this.maps.pointerMove.subscribe((event) => this.handleCursor(event));
    this.maps.singleClick.subscribe((event) => this.handleClick(event));
    const window = this.platformProvider.document.defaultView;

    if (this.embedded && this.uuid) {
      this.maps.instance.getInteractions().clear();
    }

    if (window === window.parent) {
      if (this.uuid) {
        this.route.url.pipe(
          mergeMap((url) => this.fetch(url[0].path))
        ).subscribe((items) => this.items.next(items));
      } else {
        this.type.change.pipe(
          map((change) => change.value),
          startWith('events'),
          distinctUntilChanged(),
          mergeMap((type) => this.fetch(type))
        ).subscribe((items) => this.items.next(items));
      }
    } else {
      this.connection = new MapsConnection(window, window.parent);
      this.connection.focus.subscribe((focus) => this.focus.next(focus));
      this.connection.items.subscribe((items) => this.items.next(items));
      this.connection.nextReady(true);
    }
  }

  public ngOnDestroy(): void {
    this.loadingProvider.finished(this.block);
    this.location.unsubscribe();
  }

  public handleClick(event: MapBrowserPointerEvent): void {
    if (this.items.value.length > 1) {
      const pixel = this.maps.instance.getFeaturesAtPixel(event.pixel);
      const feats = pixel.length ? pixel[0].get('features') || [] : [];
      const items = feats.map((f) =>
        this.items.value.find((i) => i.id === f.getId()));

      if (
        items.length &&
        this.focus.value.length &&
        items.every((i) => this.focus.value.find((f) => f.id === i.id)) &&
        this.focus.value.every((f) => items.find((i) => i.id === f.id))
      ) {
        this.frame(this.focus.value.map((i) => i.address)).subscribe();
        this.focus.next([]);
      } else {
        this.focus.next(items);
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

  public handleLocation(): void {
    if (!this.location.closed) {
      this.location.unsubscribe();
    } else {
      this.maps.instance.getInteractions().forEach((i) => i.setActive(false));
      this.location = this.positionProvider.locate().pipe(
        mergeMap((coords) => this.frame([coords]))
      ).subscribe(() => {
        this.center.nativeElement.classList.add('show');
        this.ripple.launch({ centered: true });
      }, () => this.enabled = false);

      this.location.add(() => {
        this.center.nativeElement.classList.remove('show');
        this.maps.instance.getInteractions().forEach((i) => i.setActive(true));
      });
    }
  }

  public handleNavigation(mode: 'DRIVING' | 'WALKING'): void {
    this.location.unsubscribe();
    this.positionProvider.locate().pipe(
      take(1),
      mergeMap((coords) => this.locationProvider.calculateRoute({
        startPointLatitude: coords.latitude,
        startPointLongitude: coords.longitude,
        targetPointLatitude: this.focus.value[0].address.latitude,
        targetPointLongitude: this.focus.value[0].address.longitude,
        travelMode: mode
      })),
      map((route) => route.routePath.line.coordinates),
      tap((coords) => this.frame(coords.map((c) => ({
        latitude: c[0],
        longitude: c[1]
      }))).subscribe()),
      map((coords) => smoothPolyline(smoothPolyline(coords))),
      map((coords) => coords.map((c) => fromLonLat([c[1], c[0]])))
    ).subscribe(
      (coords) => this.directions = coords,
      () => this.enabled = false
    );
  }

  public handleReset(): void {
    this.directions = null;
    this.location.unsubscribe();

    this.dialer.nativeElement.classList.remove('open');
    this.focus.next(this.items.value.length === 1 ? this.items.value : []);
    this.frame(this.items.value.map((i) => i.address)).subscribe();
  }

  private configuration(item: string): string {
    return this.route.snapshot.data.configuration
      .find((config) => config.item === item).value;
  }

  private fetch(target: string): Observable<MapModel[]> {
    switch (target) {
      case 'event': return this.activityProvider.readOne(this.uuid).pipe(
        mergeMap((i) => this.crudResolver.refine(i, this.graph.activity)),
        map((i: ActivityModel) => [i]), catchError(() => of([]))
      ) as Observable<ActivityModel[]>;

      case 'events': return this.activityProvider.readAll({
        current: true,
        embeddings: CrudJoiner.to(this.graph.activity)
      }).pipe(mergeMap((i) => {
        return this.crudResolver.refine(i, this.graph.activity);
      }), catchError(() => of([]))) as Observable<ActivityModel[]>;

      case 'place': return this.organisationProvider.readOne(this.uuid).pipe(
        mergeMap((i) => this.crudResolver.refine(i, this.graph.activity)),
        map((i: OrganisationModel) => [i]), catchError(() => of([]))
      ) as Observable<OrganisationModel[]>;

      case 'places': return this.organisationProvider.readAll({
        approved: true,
        embeddings: CrudJoiner.to(this.graph.organisation)
      }).pipe(mergeMap((i) => {
        return this.crudResolver.refine(i, this.graph.organisation);
      }), catchError(() => of([]))) as Observable<OrganisationModel[]>;
    }
  }

  private frame(coords: Partial<GeolocationCoordinates>[]): Observable<any> {
    return new Observable<any>((observer) => {
      if (!coords.length) {
        this.view.instance.animate({
          center: fromLonLat([
            this.mapconf.longitude,
            this.mapconf.latitude
          ]),
          duration: 1000,
          rotation: 0,
          zoom: this.mapconf.zoomfactor
        }, () => {
          observer.next();
          observer.complete();
        });
      } else {
        this.view.instance.fit([
          ...fromLonLat([
            Math.min(...coords.map((coord) => coord.longitude)),
            Math.min(...coords.map((coord) => coord.latitude))
          ]),
          ...fromLonLat([
            Math.max(...coords.map((coord) => coord.longitude)),
            Math.max(...coords.map((coord) => coord.latitude))
          ])
        ], {
          callback: () => {
            observer.next();
            observer.complete();
          },
          duration: 1000,
          maxZoom: 17.5,
          padding: [100, 100, 100, 100],
          rotation: 0
        });
      }
    });
  }

  private geometry(feature: Feature): Point {
    const point = feature.getGeometry();
    return point && point instanceof Point ? point : null;
  }

  private styling(feature: Feature): Style {
    const focus = this.focus.value.map((i) => i.id);
    const items = feature.get('features').map((feat) => {
      return this.items.value.find((item) => item.id === feat.getId());
    }) as MapModel[];

    const rgb = items.filter((item) => {
      return item instanceof ActivityModel;
    }).map((item: ActivityModel) => {
      return ColorConvert.hex.rgb(item.category.color);
    });

    if (!rgb.length) {
      rgb.push(...new Array(items.length).fill([255, 255, 255]));
    }

    const multi = rgb.length > 1;
    const focused = items.some((i) => focus.includes(i.id));
    const r = rgb.reduce((i, j) => i + j[0], 0) / rgb.length;
    const g = rgb.reduce((i, j) => i + j[1], 0) / rgb.length;
    const b = rgb.reduce((i, j) => i + j[2], 0) / rgb.length;
    const color = r + g + b > 382 ? '#000' : '#FFF';

    return new Style({
      image: new Icon({
        color: '#' + ColorConvert.rgb.hex(r, g, b),
        src: `images/pin-${multi ? 'full' : 'hole'}.png`,

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
