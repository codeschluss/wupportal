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
import { OrganisationService, OrganisationsDatabase } from '../../services/organisation.service';
import { NominatimService } from '../../services/nominatim.service';


@Component({
	selector: 'edit-acts',
	styleUrls: ['../table-basic.css'],
	templateUrl: 'activity-edit.component.html'
})

export class ActivityEditComponent implements OnInit {

	@ViewChild('filter') filter: ElementRef;

	public selectedActivity: Activity;
	activitiesDatabase = this.activityService.getActivitiesDatabase();
	public dataSource = this.activityService.getActivitiesDataSource();
	dataChange: BehaviorSubject<Organisation[]> = new BehaviorSubject<Organisation[]>([]);
	displayedColumns =
	[
		'id',
		'name',
		'description',
		'schedule',
		'show_user',
		'street',
		'housenumber',
		'postalcode',
		'place',
		'tags',
		'category',
		'targetgroups'
	];

	// for autocompletion
	filteredOrgas: Observable<Organisation[]>;
	organisationDataBase = this.organisationService.getOrganisationsDatabase();
	orgas = this.organisationDataBase.data;
	orgaCtrl: FormControl = new FormControl();

	public addressInput: string;

	constructor(
		public activityService: ActivityService,
		public nominatimService: NominatimService,
		public organisationService: OrganisationService
	) { }

	filterOrgas(input: string): Organisation[] {
		this.orgas = this.organisationDataBase.data;
		this.dataChange = this.organisationDataBase.change;
		return this.orgas.filter(orga =>
			orga.name.toLowerCase().indexOf(input.toLowerCase()) === 0);
	}

	ngOnInit() {
		this.dataSource = this.activityService.getActivitiesDataSource();
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

	selectActivity(activity: Activity) {
		this.selectedActivity = activity;
	}

	createActivity(): void {
		this.selectedActivity = new Activity();
	}

	deselectActivity(): void {
		this.selectedActivity = null;
	}

	onSubmitActivity() {
		if (this.selectedActivity.id) {
			this.selectedActivity.address = this.nominatimService.getAddress(this.addressInput);
			this.activityService.editActivity(this.selectedActivity);
			this.deselectActivity();
		} else {
			this.selectedActivity.address = this.nominatimService.getAddress(this.addressInput);
			this.activityService.postActivity(this.selectedActivity);
			this.dataSource = this.activityService.getActivitiesDataSource();
			this.deselectActivity();
		}
	}

	deleteUser() {
		this.activityService.deleteActivity(this.selectedActivity);
		this.dataSource = this.activityService.getActivitiesDataSource();
		this.deselectActivity();
	}

}
