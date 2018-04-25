import { MapComponent } from 'ngx-openlayers';
import { ViewComponent } from 'ngx-openlayers';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material';

import { Constants } from 'app/services/constants';
import { ConfigurationService } from 'app/services/data.service.factory';
import { Configuration } from 'app/models/configuration';
import { DataService } from 'app/services/data.service';
import { DataServiceFactory } from 'app/services/data.service.factory';
import { HttpClient } from '@angular/common/http';
import { ActivityService } from 'app/services/activity.service';

import { Activity } from 'app/models/activity';
import { Address } from 'app/models/address';
import { FilterComponent } from 'app/views/mapping/filter/filter.component';
import { coordinate } from 'openlayers';


@Component({
	selector: 'mapping-component',
	styleUrls: ['map.css'],
	templateUrl: 'map.html'
})

export class MappingComponent implements OnInit, AfterViewInit {

	@ViewChild(MapComponent)
	private map: MapComponent;

	@ViewChild(ViewComponent)
	private viewComponent: ViewComponent;

	@ViewChild('sidenav')
	private sideNav: MatSidenav;

	@Input()
	private center: [number, number];

	public activities: Activity[];
	public currentActivity: Activity;

	public activity: Observable<Activity>;

	public following: Observable<boolean>;

	public latitude: number;
	public longitude: number;
	public projection: string;
	public zoom: number;

	public currentDetail: Activity;
	public popupContent: Activity[];

	constructor(
		@Inject(ConfigurationService) private configurationService: DataService,
		protected activityService: ActivityService,
		protected constants: Constants
	) { }

	ngOnInit(): void {
		this.latitude = 51.2640;
		this.longitude = 7.1756;
		this.zoom = 13.5;
		this.projection = 'EPSG:4326';
		this.popupContent = [];

		// should work, when configs api is open

		// this.configurationService.getAll().subscribe(response => {
		// 	const configurations = response.records;
		// 	for (let i = 0; i < configurations.length; i++) {
		// 		const currConfig = configurations[i];
		// 		if (configurations[i] === ('mapcenterLatitude')) {
		// 			this.latitude = parseFloat(currConfig.value);
		// 			continue;
		// 		}
		// 		if (configurations[i] === ('mapcenterLongitude')) {
		// 			this.longitude = parseFloat(currConfig.value);
		// 			continue;
		// 		}
		// 		if (configurations[i] === ('mapProjection')) {
		// 			this.projection = currConfig.value;
		// 			continue;
		// 		}
		// 		if (configurations[i] === ('zoomfactor')) {
		// 			this.zoom = parseInt(currConfig.value, 10);
		// 			continue;
		// 		}
		// 	}
		// });

		this.activityService.getAll().subscribe(response => this.activities = response);
	}


	// wip

	// this.following.subscribe((i) => i
	// 	? this.locationService.filter().subscribe((i) => { this.center(i[0]); })
	// 	: this.locationService.disconnect()
	// );

	// center(address: Address): void {
	// 	this.view.instance.animate({
	// 		center: [address.longitude, address.latitude],
	// 		duration: 1000
	// 	});
	// }

	// focus(address: Address, zoom: number): void {
	// 	if (address.latitude === 0 || address.longitude === 0) { return; }
	// 	this.viewComponent.instance.animate({
	// 		center: [address.longitude, address.latitude],
	// 		duration: 1000,
	// 		zoom: 15
	// 	});
	// }

	// jump(address: Address): void {
	// 	if (address.latitude === 0 || address.longitude === 0) { return; }
	// 	this.viewComponent.instance.animate({
	// 		duration: 1000,
	// 		zoom: 8
	// 	}, {
	// 			center: [address.longitude, address.latitude],
	// 			duration: 10000,
	// 			zoom: 20
	// 		}
	// 	);
	// 	// this.viewComponent.instance.animate({
	// 	// 	center: [address.longitude, address.latitude],
	// 	// 	duration: 2000,
	// 	// 	zoom: 20
	// 	// });
	// }

	public showDetails(activity: Activity): void {
		if (this.currentDetail) {
			this.sideNav.close().then(() => { this.currentDetail = activity; this.sideNav.open(); });
		} else {
			this.sideNav.open().then(() => { this.currentDetail = activity; });
		}
	}

	ngAfterViewInit(): void {
		this.map.onClick.subscribe((event) => {
			const features = this.map.instance.getFeaturesAtPixel(event.pixel);
			if (features) {
				if (features.length > 1) {
					this.sideNav.close().then(() => {
						this.currentDetail = null;
					});
					this.popupContent = [];
					this.currentDetail = null;
					this.latitude = new Activity(this.activities.find(activity => activity.id === features[0]['c'])).address.latitude;
					this.longitude = new Activity(this.activities.find(activity => activity.id === features[0]['c'])).address.longitude;
					for (const f of features) {
						this.popupContent.push(new Activity(this.activities.find(act => act.id === f['c'])));
					}
				} else {
					this.popupContent = [];
					const act = new Activity(this.activities.find(activity => activity.id === features[0]['c']));
					this.showDetails(act);
					this.sideNav.open();
					this.latitude = act.address.latitude;
					this.longitude = act.address.longitude;
				}
			} else {
				this.popupContent = [];
				this.sideNav.close();
			}
		});
	}



}

