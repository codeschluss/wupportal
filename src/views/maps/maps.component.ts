import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CrudJoiner, CrudResolver, PositionProvider, Selfrouter } from '@wooportal/core';
import * as colorConvert from 'color-convert';
import { LayerVectorComponent, MapComponent, ViewComponent } from 'ngx-openlayers';
import { Feature, MapBrowserPointerEvent } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Fill, Icon, Style, Text } from 'ol/style';
import { EMPTY, Subscription } from 'rxjs';
import { ActivityModel } from '../../realm/models/activity.model';
import { ConfigurationModel } from '../../realm/models/configuration.model';

@Component({
  styleUrls: ['maps.component.scss'],
  templateUrl: 'maps.component.html'
})

export class MapsComponent extends Selfrouter implements OnInit, AfterViewInit {

  public attached: Subscription = EMPTY.subscribe();

  public cluster: number;

  public latitude: number;

  public longitude: number;

  public projection: string;

  public zoomfactor: number;

  protected routing: Route = {
    path: '',
    resolve: {
      activities: CrudResolver,
      configuration: CrudResolver
    },
    data: {
      resolve: {
        activities: CrudJoiner.of(ActivityModel)
          .with('address')
          .with('category'),
        configuration: CrudJoiner.of(ConfigurationModel)
      }
    }
  };

  @ViewChild('attach', { static: true })
  private attach: MatButton;

  @ViewChild(MatRipple, { static: true })
  private center: MatRipple;

  @ViewChild(LayerVectorComponent, { static: true })
  private layer: LayerVectorComponent;

  @ViewChild(MapComponent, { static: true })
  private maps: MapComponent;

  @ViewChild(ViewComponent, { static: true })
  private view: ViewComponent;

  public get items(): ActivityModel[] {
    return this.route.snapshot.data.activities || [];
  }

  public constructor(
    private positionProvider: PositionProvider,
    private route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.cluster = parseFloat(this.configuration('mapCluster'));
    this.latitude = parseFloat(this.configuration('mapLatitude'));
    this.longitude = parseFloat(this.configuration('mapLongitude'));
    this.projection = this.configuration('mapProjection');
    this.zoomfactor = parseFloat(this.configuration('mapZoomfactor'));

    if (this.route.snapshot.queryParams.embed === 'true') {
      document.body.classList.add('embedded');
    }
  }

  public ngAfterViewInit(): void {
    this.layer.instance.setStyle((feature) => this.styling(feature));
    this.maps.onSingleClick.subscribe((event) => this.handleClick(event));
    setTimeout(() => this.maps.instance.updateSize(), 1);
  }

  public handleAttach(): void {
    this.attachment(this.attached.closed);
  }

  public handleReset(): void {
    this.attachment(false);
    this.view.instance.animate({
      center: fromLonLat([this.longitude, this.latitude]),
      rotation: 0,
      zoom: this.zoomfactor
    });
  }

  public handleClick(event: MapBrowserPointerEvent): void {
    console.log(this.maps.instance.getFeaturesAtPixel(event.pixel));
  }

  private attachment(enable: boolean): void {
    if (enable) {
      this.attach.color = 'primary';
      this.maps.instance.getInteractions().forEach((i) => i.setActive(false));
      this.attached = this.positionProvider.locate().subscribe((coords) => {
        this.attach.ripple.launch({ centered: true });
        this.center.launch({ centered: true });
        this.view.instance.animate({
          center: fromLonLat([coords.longitude, coords.latitude]),
          duration: 1000,
          zoom: 17.5
        });
      }, () => {
        this.attachment(false);
        this.attach.disabled = true;
        this.attach._getHostElement().style.pointerEvents = 'none';
      });
    } else {
      this.attach.color = null;
      this.attached.unsubscribe();
      this.maps.instance.getInteractions().forEach((i) => i.setActive(true));
    }
  }

  private configuration(item: string): string {
    return this.route.snapshot.data.configuration
      .find((config) => config.item === item).value;
  }

  private styling(feature: Feature): Style {
    const colors = feature.get('features').map((feat) => {
      const activity = this.items.find((item) => feat.getId() === item.id);

      return colorConvert.keyword.rgb(activity.category.color)
        || colorConvert.hex.rgb(activity.category.color);
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
