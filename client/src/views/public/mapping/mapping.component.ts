import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularOpenlayersModule, LayerVectorComponent, MapComponent, ViewComponent } from 'ngx-openlayers';
import { Feature, MapBrowserEvent, proj, style } from 'openlayers';
import { Subject } from 'rxjs';
import { ActivityModel } from '../../../core/models/activity.model';
import { AddressModel } from '../../../core/models/address.model';

@Component({
  selector: 'mapping-component',
  templateUrl: 'mapping.component.html',
})

export class MappingComponent implements AfterViewInit, OnInit, OnDestroy {

  public static readonly imports = [
    AngularOpenlayersModule
  ];

  @Input()
  public activities: ActivityModel[];

  public clusterspan: number;
  public latitude: number;
  public longitude: number;
  public projection: string;
  public zoomfactor: number;

  @ViewChild(LayerVectorComponent)
  private aolLayer: LayerVectorComponent;

  @ViewChild(MapComponent)
  private aolMap: MapComponent;

  @ViewChild(ViewComponent)
  private aolView: ViewComponent;

  private readonly ngUnsubscribe: Subject<null> = new Subject<null>();

  public constructor(
    // private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.latitude = 41;
    this.longitude = 7;
    this.zoomfactor = 14;
    this.projection = 'EPSG:4326';

    // this.activities[0].address.then((address) => {
    //   this.latitude = address.latitude;
    //   this.longitude = address.longitude;
    //   this.zoomfactor = 14;
    //   this.projection = 'EPSG:4326';
    // });

    // TODO: move to db
    this.clusterspan = 5;

    // if (this.activities.length === 1) {
    //   this.latitude = this.activities[0].address.latitude;
    //   this.longitude = this.activities[0].address.longitude;
    //   this.zoomfactor = 14;
    //   this.projection = 'EPSG:4326';
    // } else {
    //   for (const item of this.route.snapshot.data.configuration) {
    //     switch (item.item) {
    //       case 'mapcenterLatitude':
    //         this.latitude = this.activities[0].address.latitude;
    //         break;
    //       case 'mapcenterLongitude':
    //         this.longitude = this.activities[0].address.longitude;
    //         break;
    //       case 'mapProjection':
    //         this.projection = 'EPSG:4326';
    //         break;
    //       case 'zoomfactor':
    //         this.zoomfactor = 14;
    //         break;
    //     }
    //   }
    // }
    // TODO: redo
    // this.activities = this.route.snapshot.data
    //   .activities.filter((i) => i.address);
  }

  public ngAfterViewInit(): void {
    (<ol.layer.Vector>this.aolLayer.instance)
      .setStyle((feature: Feature) => this.featureStyle(feature));

    this.aolMap.loadTilesWhileAnimating = true;
    this.aolMap.loadTilesWhileInteracting = true;
    // this.aolMap.onSingleClick.pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe((event: MapBrowserEvent) => this.onClick(event));

    // this.router.events
    //   .pipe(filter(i => i instanceof NavigationEnd))
    //   .pipe(startWith(null))
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe(() => this.applyRoutes());
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

  public centerAddress(address: AddressModel): void {
    if (address.longitude && address.latitude) {
      this.aolView.instance.animate({
        center: proj.fromLonLat([address.longitude, address.latitude]),
        // duration: 1000,
        zoom: Math.max(this.aolView.instance.getZoom(), this.zoomfactor * 1.25)
      });
    }
  }

  private applyRoutes(): void {
    // for (const child of this.route.children) {
    //   switch (child.component) {
    //     case AboutActivityComponent:
    //       this.centerAddress(child.snapshot.data.activity.address);
    //       break;
    //     case AboutOrganisationComponent:
    //       this.centerAddress(child.snapshot.data.organisation.address);
    //       break;
    //   }
    // }
  }

  private featureStyle(feature: Feature): style.Style {
    // const colors = feature.get('features').map((i) => {
    //   const activity = this.activities.find(j => i.getId() === j.id);

    //   return colorConvert.keyword.rgb(activity.category.color)
    //     || colorConvert.hex.rgb(activity.category.color);
    // });

    // const r = colors.reduce((i, j) => i + j[0], 0) / colors.length;
    // const g = colors.reduce((i, j) => i + j[1], 0) / colors.length;
    // const b = colors.reduce((i, j) => i + j[2], 0) / colors.length;

    const colors = { length: 1 };

    return new style.Style({
      image: new style.Icon({
        anchor: [.5, 1],
        // color: '#' + colorConvert.rgb.hex(r, g, b),
        color: 'blue',
        imgSize: [60, 96],
        scale: 1 / (colors.length > 1 ? 2 : 3),
        src: `${colors.length > 1 ? '/imgs/mapcluster' : '/imgs/mapmarker'}.png`
      })
    });

    // const colors = feature.get('features').map(i => {
    //   const activity = this.activities.find(j => i.getId() === j.id);

    //   return colorConvert.keyword.rgb(activity.category.color)
    //     || colorConvert.hex.rgb(activity.category.color);
    // });

    // const r = colors.reduce((i, j) => i + j[0], 0) / colors.length;
    // const g = colors.reduce((i, j) => i + j[1], 0) / colors.length;
    // const b = colors.reduce((i, j) => i + j[2], 0) / colors.length;

    // const icon = {
    //   anchor: [.5, 1],
    //   color: '#' + colorConvert.rgb.hex(r, g, b),
    //   scale: 0.9 + colors.length / 10,
    //   src: '/imgs/mapmarker.svg'
    // };

    // if (window.navigator.userAgent.match(/(MSIE|Trident)/)) {
    //   Object.defineProperty(icon, {
    //     imgSize: [60, 96],
    //     scale: icon.scale / 3,
    //     src: '/imgs/mapmarker.png'
    //   });
    // }

    // return new style.Style({ image: new style.Icon(icon) });
  }

  private onClick(event: MapBrowserEvent): void {
    const click = this.aolMap.instance.getFeaturesAtPixel(event.pixel);
    const feats = click && click.length ? click[0].get('features') : [];

    switch (feats.length) {
      case 0:
        this.router.navigate(['/']);
        break;
      case 1:
        this.router.navigate(['/activity', feats[0].getId()]);
        break;
      default:
      // this.router.navigate(['/']).then(() => {
      //   this.dialog.open(ActivityDialogComponent, {
      //     // TODO: ngx-openlayers async id binding bug
      //     // data: feats.map(i => this.activities.find(j => j.id === i.getId()))
      //     data: feats.map(i => i.getStyle().getText().getText())
      //       .map(i => this.activities.find(j => j.id === i))
      //     // ENDTODO
      //   }).afterClosed().filter(i => i).subscribe((activity: Activity) =>
      //     this.router.navigate(['/activity', activity.id]));
      // });
    }
  }

}
