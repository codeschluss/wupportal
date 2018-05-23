import { MatDialog } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
	AfterViewInit,
	Component,
	Inject,
	Input,
	OnDestroy,
	OnInit,
	ViewChild
} from '@angular/core';

import * as colorConvert from 'color-convert';

import { Feature, MapBrowserEvent, proj, style } from 'openlayers';
import {
	LayerVectorComponent,
	MapComponent,
	ViewComponent
} from 'ngx-openlayers';

import { Subject } from 'rxjs/Subject';

import { Activity } from 'app/models/activity';
import { Address } from 'app/models/address';

import { Constants } from 'app/services/constants';

import {
	AboutActivityComponent
} from 'app/portal/about/about.activity.component';
import {
	AboutOrganisationComponent
} from 'app/portal/about/about.organisation.component';
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

		for (const item of this.route.snapshot.data.configuration) {
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
			}
		}
	}

	public ngAfterViewInit(): void {
		(<ol.layer.Vector> this.aolLayer.instance)
			.setStyle((feature: Feature) => this.clusterStyle(feature));

		this.aolMap.loadTilesWhileAnimating = true;
		this.aolMap.loadTilesWhileInteracting = true;
		this.aolMap.onSingleClick.takeUntil(this.ngUnsubscribe)
			.subscribe((event: MapBrowserEvent) => this.onClick(event));

		this.router.events.filter(i => i instanceof NavigationEnd).startWith(null)
			.takeUntil(this.ngUnsubscribe).subscribe(() => this.applyRoutes());
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe.next(null);
		this.ngUnsubscribe.complete();
	}

	public centerAddress(address: Address): void {
		if (address.longitude && address.latitude) {
			this.aolView.instance.animate({
				center: proj.fromLonLat([address.longitude, address.latitude]),
				// duration: 1000,
				zoom: Math.max(this.aolView.instance.getZoom(), this.zoomfactor * 1.25)
			});
		}
	}

	private applyRoutes(): void {
		for (const child of this.route.children) {
			switch (child.component) {
				case AboutActivityComponent:
					this.centerAddress(child.snapshot.data.activity.address);
					break;
				case AboutOrganisationComponent:
					this.centerAddress(child.snapshot.data.organisation.address);
					break;
			}
		}
	}

	private clusterStyle(feature: Feature): style.Style {
		const colors = feature.get('features').map(i => {
			// TODO: ngx-openlayers async id binding bug
			// const activity = this.activities.find(j => i.getId() === j.id);
			const id = i.getStyle().getText().getText();
			const activity = this.activities.find(j => id === j.id);
			// ENDTODO

			return colorConvert.keyword.rgb(activity.category.color)
				|| colorConvert.hex.rgb(activity.category.color);
		});

		const r = colors.reduce((i, j) => i + j[0], 0) / colors.length;
		const g = colors.reduce((i, j) => i + j[1], 0) / colors.length;
		const b = colors.reduce((i, j) => i + j[2], 0) / colors.length;

		let icon = {
			anchor: [.5, 1],
			color: '#' + colorConvert.rgb.hex(r, g, b),
			scale: 0.9 + colors.length / 10,
			src: '/imgs/mapmarker.svg'
		};

		if (window.navigator.userAgent.match(/(MSIE|Trident)/)) {
			Object.assign(icon, {
				imgSize: [60, 96],
				scale: icon.scale / 3,
				src: '/imgs/mapmarker.png'
			});
		}

		return new style.Style({ image: new style.Icon(icon) });
	}

	private onClick(event: MapBrowserEvent): void {
		const click = this.aolMap.instance.getFeaturesAtPixel(event.pixel);
		const feats = click && click.length ? click[0].get('features') : [];

		switch (feats.length) {
			case 0:
				this.router.navigate(['/']);
				break;
			case 1:
				// TODO: ngx-openlayers async id binding bug
				// this.router.navigate(['/activity', feats[0].getId()]);
				this.router.navigate([
					'/activity',
					feats[0].getStyle().getText().getText()]
				);
				// ENDTODO
				break;
			default:
				this.router.navigate(['/']).then(() => {
					this.dialog.open(ActivityDialogComponent, {
						// TODO: ngx-openlayers async id binding bug
						// data: feats.map(i => this.activities.find(j => j.id === i.getId()))
						data: feats.map(i => i.getStyle().getText().getText())
							.map(i => this.activities.find(j => j.id === i))
						// ENDTODO
					}).afterClosed().filter(i => i).subscribe((activity: Activity) =>
						this.router.navigate(['/activity', activity.id]));
				});
		}
	}

}
