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
import { Activity } from '../../common/model/activity';
import { ActivityService } from '../../services/activity.service';
import { Organisation } from '../../common/model/organisation';
import { OrgaService } from '../../services/organisation.service';
import { NominatimService } from '../../services/nominatim.service';
import { Headers, Http } from '@angular/http';

@Component({
	selector: 'editact',
	styleUrls: ['../table-basic.css'],
	templateUrl: 'activitiesform.html'
})

export class ActivitiesComponent {
	protected headers = new Headers({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' });
	public selectedActivity: Activity;
	displayedColumns = ['id', 'name', 'description', 'schedule', 'show_user', 'street', 'housenumber', 'postalcode', 'place', 'tags', 'category', 'targetgroups'];
	activitiesDatabase = new ActivitiesDatabase(this.activityService);
	dataSource: ActivityDataSource | null;

	// autocompletion
	filteredOrgas: Observable<Organisation[]>;
	orgas: Organisation[];
	orgaCtrl: FormControl = new FormControl();
	public addressInput: string;

	constructor(
		public activityService: ActivityService,
		public organisationService: OrgaService,
		public nominatimService: NominatimService,
		private http: Http
	) { }

	filterOrgas(input: string): Organisation[] {
		return this.orgas.filter(orga =>
			orga.name.toLowerCase().indexOf(input.toLowerCase()) === 0);
	}

	@ViewChild('filter') filter: ElementRef;

	ngOnInit() {
		this.orgas = new Array();
		this.organisationService.getOrgas().then(orgas => {
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
	onSubmitActivity() {
		if (this.selectedActivity.id) {
			return this.http.put('http://localhost:8765' + '/activity/' +
				this.selectedActivity.id,
				JSON.stringify(this.selectedActivity)
				, { headers: this.headers }
			).subscribe(newActivity => this.selectedActivity = newActivity.json());
		}
		else {
			this.nominatimService.getGeoDates(this.addressInput).then(results => {
				results.forEach(geoDate => {
					this.selectedActivity.address.latitude = geoDate['lat'];
					this.selectedActivity.address.longitude = geoDate['lon'];
					this.selectedActivity.address.housenumber = geoDate['addresss']['house_number'];
					this.selectedActivity.address.postalcode = geoDate['addresss']['postcode'];
					this.selectedActivity.address.place = geoDate['addresss']['city'];
					this.selectedActivity.address.street = geoDate['addresss']['road'];
				});
			});

			return this.http.post('http://localhost:8765' + '/activity/',
				JSON.stringify(this.selectedActivity)
				, { headers: this.headers }
			).subscribe(newActivity => this.selectedActivity = newActivity.json());
		}
	}

	selectActivity(activity: Activity) {
		this.selectedActivity = activity;
	}

}

export class ActivitiesDatabase {
	public activities: Activity[];
	dataChange: BehaviorSubject<Activity[]> = new BehaviorSubject<Activity[]>([]);

	constructor(private activityService: ActivityService) {
		this.activities = new Array();
		this.activityService.getActivities().then(activities => {
			activities.forEach(act => {
				this.activities.push(act);
				this.dataChange.next(this.activities);
			});
		});
	}

	get data(): Activity[] { return this.dataChange.value; }
}


export class ActivityDataSource extends DataSource<Activity> {
	_filterChange = new BehaviorSubject('');
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
				return searchStr.indexOf(this.filter.toLowerCase()) != -1;
			});
		});
	}

	disconnect() { }



}
