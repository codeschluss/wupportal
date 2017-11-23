import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Activity } from 'app/models/activity';
import { ActivityService } from 'app/services/activity';
import { Organisation } from 'app/models/organisation';
import { OrganisationService } from 'app/services/organisation';
import { NominatimService } from 'app/services/nominatim';
import { Headers, Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'edit-activities',
	styleUrls: ['../table-basic.css'],
	templateUrl: 'activitiesform.html'
})

export class ActivitiesComponent implements OnInit {
	protected headers: Headers = new Headers({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' });
	public selectedActivity: Activity;
	displayedColumns: Array<string> =
		['id', 'name', 'description', 'date', 'street', 'housenumber', 'postalcode', 'place', 'tags', 'category', 'targetgroups'];
	activitiesDatabase: ActivitiesDatabase = new ActivitiesDatabase(this.activityService);
	dataSource: ActivityDataSource | null;

	// autocompletion
	filteredOrgas: Observable<Organisation[]>;
	orgas: Organisation[];
	orgaCtrl: FormControl = new FormControl();
	public addressInput: string;
	@ViewChild('filter') filter: ElementRef;

	constructor(
		public activityService: ActivityService,
		public organisationService: OrganisationService,
		public nominatimService: NominatimService,
		private http: Http
	) { }

	filterOrgas(input: string): Organisation[] {
		return this.orgas.filter(orga =>
			orga.name.toLowerCase().indexOf(input.toLowerCase()) === 0);
	}

	ngOnInit(): void {
		this.orgas = new Array();
		this.organisationService.list().map(orgas => {
			orgas.forEach(orga => {
				this.orgas.push(orga);
			});
		});

		this.dataSource = new ActivityDataSource(this.activitiesDatabase);
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.debounceTime(150)
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});

		this.filteredOrgas = this.orgaCtrl.valueChanges
			.startWith(null)
			.map(orga => orga ? this.filterOrgas(orga) : this.orgas.slice());
	}

	createActivity(): void {
		this.selectedActivity = new Activity();
	}

	deselectActivity(): void {
		this.selectedActivity = null;
	}

	// TODO: both methods should move to ActivityService
	onSubmitActivity(): Subscription {
		if (this.selectedActivity.id) {
			return this.http.put('http://localhost:8765' + '/activity/' +
				this.selectedActivity.id,
				JSON.stringify(this.selectedActivity)
				, { headers: this.headers }
			).subscribe(newActivity => this.selectedActivity = newActivity.json());
		} else {
			this.nominatimService.get(this.addressInput).map(geoDate => {
				this.selectedActivity.address.latitude = geoDate['lat'];
				this.selectedActivity.address.longitude = geoDate['lon'];
				this.selectedActivity.address.houseNumber = geoDate['address']['house_number'];
				this.selectedActivity.address.postalCode = geoDate['address']['postcode'];
				this.selectedActivity.address.place = geoDate['address']['city'];
				this.selectedActivity.address.street = geoDate['address']['road'];
			});
		}

		return this.http.post('http://localhost:8765' + '/activity/',
			JSON.stringify(this.selectedActivity)
			, { headers: this.headers }
		).subscribe(newActivity => this.selectedActivity = newActivity.json());
	}


	selectActivity(activity: Activity): void {
		this.selectedActivity = activity;
	}

}

export class ActivitiesDatabase {
	public activities: Activity[];
	dataChange: BehaviorSubject<Activity[]> = new BehaviorSubject<Activity[]>([]);

	constructor(private activityService: ActivityService) {
		this.activities = new Array();
		this.activityService.list().map(activities => {
			activities.forEach(act => {
				this.activities.push(act);
				this.dataChange.next(this.activities);
			});
		});
	}

	get data(): Activity[] { return this.dataChange.value; }
}


export class ActivityDataSource extends DataSource<Activity> {
	_filterChange: BehaviorSubject<string> = new BehaviorSubject('');
	get filter(): string { return this._filterChange.value; }
	set filter(filter: string) { this._filterChange.next(filter); }

	constructor(private _activitiesDatabase: ActivitiesDatabase) {
		super();
	}

	connect(): Observable<Activity[]> {
		const displayDataChanges = [
			this._activitiesDatabase.dataChange,
			this._filterChange,
		];
		return Observable.merge(...displayDataChanges).map(() => {
			return this._activitiesDatabase.data.slice().filter((item: Activity) => {
				const searchStr = (item.name).toLowerCase();
				return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
			});
		});
	}

	disconnect(): void { }



}
