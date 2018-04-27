import {
	AfterViewInit,
	Component,
	Inject,
	Input,
	OnDestroy,
	OnInit,
	ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import * as colorConvert from 'color-convert';

import {
	LayerVectorComponent,
	MapComponent,
	ViewComponent
} from 'ngx-openlayers';
import {
	Feature,
	MapBrowserEvent,
	proj,
	style
} from 'openlayers';

import { Subject } from 'rxjs/Subject';

import { Activity } from 'app/models/activity';
import { Address } from 'app/models/address';

import { Constants } from 'app/services/constants';

import {
	AboutActivityComponent
} from 'app/portal/about/about.activity.component';
import {
	ActivityDialogComponent
} from 'app/portal/dialogs/activity.dialog.component';

@Component({
	selector: 'mapping-component',
	styleUrls: ['mapping.component.css'],
	templateUrl: 'mapping.component.html',
})

export class MappingComponent implements OnInit, AfterViewInit, OnDestroy {

	@Input()
	public activities: Activity[];

	@ViewChild(LayerVectorComponent)
	private aolLayer: LayerVectorComponent;

	@ViewChild(MapComponent)
	private aolMap: MapComponent;

	@ViewChild(ViewComponent)
	private aolView: ViewComponent;

	private clusterspan: number;
	private latitude: number;
	private longitude: number;
	private projection: string;
	private zoomfactor: number;

	private readonly ngUnsubscribe: Subject<null> = new Subject();

	constructor(
		@Inject(Constants)
		private constants: Constants,

		private dialog: MatDialog,
		private route: ActivatedRoute,
		private router: Router
	) { }

	public ngOnInit(): void {

		// TODO: move to db
		this.clusterspan = 10;

		for (const item of this.route.snapshot.data['configuration']) {
			switch (item.item) {
				case 'mapcenterLatitude':
					this.latitude = parseFloat(item.value);
					break;
				case 'mapcenterLongitude':
					this.longitude = parseFloat(item.value);
					break;
				case 'mapProjection':
					this.projection = item.value;
					break;
				case 'zoomfactor':
					this.zoomfactor = parseFloat(item.value);
					break;
				default:
					continue;
			}
		}
	}

	public ngAfterViewInit(): void {
		(<ol.layer.Vector> this.aolLayer.instance)
			.setStyle((feature: Feature) => this.clusterStyle(feature));

		this.aolMap.loadTilesWhileAnimating = true;
		this.aolMap.loadTilesWhileInteracting = true;
		this.aolMap.onSingleClick.takeUntil(this.ngUnsubscribe)
			.subscribe((event: MapBrowserEvent) => this.handleClick(event));

		this.router.events.filter(i => i instanceof NavigationEnd).startWith(null)
			.takeUntil(this.ngUnsubscribe).subscribe(() => this.applyRoutes());
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe.next(null);
		this.ngUnsubscribe.complete();
	}

	private handleClick(event: MapBrowserEvent): void {
		const click = this.aolMap.instance.getFeaturesAtPixel(event.pixel);
		const feats = click && click.length ? click[0].get('features') : [];

		switch (feats.length) {
			case 0:
				this.router.navigate(['']);
				break;
			case 1:
				this.router.navigate(['activity', feats[0].getId()]);
				break;
			default:
				this.router.navigate(['']).then(() => {
					this.dialog.open(ActivityDialogComponent, {
						data: feats.map(i => this.activities.find(j => j.id === i.getId()))
					}).afterClosed().subscribe((activity: Activity) =>
						this.router.navigate(activity ? ['activity', activity.id] : ['']));
				});
		}
	}

	private applyRoutes(): void {
		for (const child of this.route.children) {
			switch (child.component) {
				case AboutActivityComponent:
					this.centerAddress(child.snapshot.data.activity.address);
					break;
				default:
					continue;
			}
		}
	}

	private centerAddress(address: Address): void {
		this.aolView.instance.animate({
			center: proj.fromLonLat([address.longitude, address.latitude]),
			duration: 1000,
			zoom: Math.max(this.aolView.instance.getZoom(), this.zoomfactor * 1.25)
		});
	}

	private clusterStyle(feature: Feature): style.Style {
		const colours = feature.get('features').map(i => {
		const activity = this.activities.find(j => i.getId() === j.id);

		return colorConvert.keyword.rgb(activity.category.color)
			|| colorConvert.hex.rgb(activity.category.color);
		});

		const r = colours.reduce((i, j) => i + j[0], 0) / colours.length;
		const g = colours.reduce((i, j) => i + j[1], 0) / colours.length;
		const b = colours.reduce((i, j) => i + j[2], 0) / colours.length;

		return new style.Style({
			image: new style.Icon({
				anchor: [.5, 1],
				color: [r, g, b, 1],
				scale: 0.9 + colours.length / 10,
				src: '/imgs/pin.svg'
			})
		});
	}

}
