import { MapComponent } from 'ngx-openlayers';
import { ViewComponent } from 'ngx-openlayers';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { ViewChild } from '@angular/core';

import { Activity } from 'app/models/activity';
import { Address } from 'app/models/address';

@Component({
	selector: 'mapping-component',
	styleUrls: ['style.css'],
	templateUrl: 'view.html'
})

export class MappingComponent {

	// @Input()
	// public configuration: Observable<Activity[]> = null;

	@Input()
	public selectables: Observable<Activity[]> = null;

	@Output()
	public selection: Subject<Activity> = new Subject<Activity>();

	@ViewChild(MapComponent)
	private map: MapComponent;

	@ViewChild(ViewComponent)
	private view: ViewComponent;

	public center(address: Address): void {
		this.view.instance.animate({
			center: [address.longitude, address.latitude],
			duration: 1000
		});
	}

}

// public focus(address: Address, zoom: number): void {
// 	if (address.latitude === 0 || address.longitude === 0) { return; }
//
// 	this.viewComponent.instance.animate({
// 		center: [address.longitude, address.latitude],
// 		duration: 1000,
// 		zoom: 15
// 	});
// }

// public jump(address: Address): void {
// 	if (address.latitude === 0 || address.longitude === 0) { return; }
//
// 	this.viewComponent.instance.animate({
// 		duration: 1000,
// 		zoom: 15
// 	}, {
// 		duration: 1000,
// 		zoom: 20
// 	});
//
// 	this.viewComponent.instance.animate({
// 		center: [address.longitude, address.latitude],
// 		duration: 2000
// 	});
// }

// public activities: BehaviorSubject<Activity[]> =
// 	new BehaviorSubject<Activity[]>([]);

// public activity: BehaviorSubject<Activity> =
// 	new BehaviorSubject<Activity>(null);

// public following: BehaviorSubject<boolean> =
// 	new BehaviorSubject<boolean>(false);

// constructor(
// 	private configurationService: ConfigurationService,
// 	private locationService: LocationService
// ) { }

// public ngAfterViewInit(): void {
// 	this.mapComponent.loadTilesWhileAnimating = true;
// 	this.mapComponent.loadTilesWhileInteracting = true;
//
// 	this.activities.subscribe((i) => { console.log(i); });
// 	this.activity.subscribe((i) => { console.log(i); });
// }

// public ngOnDestroy(): void {
// 	this.configurationService.disconnect();
// 	this.locationService.disconnect();
// }

// public ngOnInit(): void {
// 	this.configurationService.connect();
//
// 	this.configurationService.filter('mapcenterLatitude')
// 		.subscribe((i) => { this.latitude = parseFloat(i[0].value); });
//
// 	this.configurationService.filter('mapcenterLongitude')
// 		.subscribe((i) => { this.longitude = parseFloat(i[0].value); });
//
// 	this.configurationService.filter('mapProjection')
// 		.subscribe((i) => { this.projection = i[0].value; });
//
// 	this.configurationService.filter('zoomfactor')
// 		.subscribe((i) => { this.zoom = parseInt(i[0].value, 10); });
//
// 	this.following.subscribe((i) => i
// 		? this.locationService.filter().subscribe((i) => { this.center(i[0]); })
// 		: this.locationService.disconnect()
// 	);
// }
