import { Component, Inject, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Activity } from 'app/models/activity';
import { TargetGroup } from 'app/models/target-group';
import { Tag } from 'app/models/tag';
import { Category } from 'app/models/category';
import { Schedule } from 'app/models/schedule';
import { User } from 'app/models/user';
import { Provider } from 'app/models/provider';

import {
	AddressService,
	DataServiceFactory,
	TagService,
	TargetGroupService,
	CategoryService,
	OrganisationService,
	UserService,
	ScheduleService
} from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ProviderService } from 'app/services/provider.service';
import { AddressAutocompleteComponent } from 'app/views/admin/addresses/address.autocomplete';
import { ActivityDetailComponent } from 'app/views/admin/activities/activity.detail';
import { ActivityService } from 'app/services/activity.service';
import { Constants } from 'app/services/constants';
import { Object } from 'openlayers';
import { Subscription } from 'rxjs/Subscription';
import { generate } from 'rxjs/observable/generate';


@Component({
	selector: 'activity-form',
	templateUrl: 'activity.form.html',
	styleUrls: ['../../../app.component.css'],
	providers: [
		ProviderService,
		ActivityService,
		{ provide: AddressService, useFactory: DataServiceFactory(AddressService), deps: [HttpClient, AuthenticationService] },
		{ provide: UserService, useFactory: DataServiceFactory(UserService), deps: [HttpClient, AuthenticationService] },
		{ provide: TagService, useFactory: DataServiceFactory(TagService), deps: [HttpClient, AuthenticationService] },
		{ provide: TargetGroupService, useFactory: DataServiceFactory(TargetGroupService), deps: [HttpClient, AuthenticationService] },
		{ provide: CategoryService, useFactory: DataServiceFactory(CategoryService), deps: [HttpClient, AuthenticationService] },
		{ provide: ScheduleService, useFactory: DataServiceFactory(ScheduleService), deps: [HttpClient, AuthenticationService] }
	]
})

export class ActivityFormComponent implements OnInit {

	activity: Activity;
	panelNumber: number;
	targetGroups: TargetGroup[];
	toDeleteSchedules: Schedule[];
	categories: Category[];
	providers: Provider[] = [];
	showUser: boolean = false;
	protected user: User;

	tagsCtrl: FormControl;
	categoryCtrl: FormControl;
	weekDaysCtrl: FormControl;
	startTimeCtrl: FormControl;
	startDateCtrl: FormControl;
	endTimeCtrl: FormControl;
	endDateCtrl: FormControl;
	targetGroupCtrl: FormControl;
	providerCtrl: FormControl;
	showRecurrence: boolean;
	scheduleIsRecurrent: boolean = false;
	isLinear: boolean = false;
	weeklyRythm: number = 1;
	currentStartDate: FormControl;
	currentStartTime: FormControl;
	currentEndDate: FormControl;
	currentEndTime: FormControl;
	firstFormGroup: FormGroup;

	@ViewChild('addressAutocompleteComponent') addressAutocomplete: AddressAutocompleteComponent;

	constructor(
		private activityService: ActivityService,
		private providerService: ProviderService,
		@Inject(UserService) public userService: DataService,
		@Inject(AddressService) public addressService: DataService,
		@Inject(ScheduleService) private scheduleService: DataService,
		@Inject(TagService) private tagService: DataService,
		@Inject(TargetGroupService) private targetGroupService: DataService,
		@Inject(CategoryService) private categoriesService: DataService,
		public authService: AuthenticationService,
		private location: Location,
		public route: ActivatedRoute,
		public constants: Constants,
		private controlAddressDialog: MatDialog,
		private _formBuilder: FormBuilder
	) {
		this.targetGroupService.getAll().subscribe((data) => this.targetGroups = data.records);
		this.categoriesService.getAll().subscribe((data) => this.categories = data.records);
	}

	ngOnInit(): void {
		this.providerService
			.getByUser(this.authService.currentUser.id)
			.map(data => data.records)
			.subscribe(providers => providers.map(provider => {
				if (provider.approved) { this.providers.push(provider); }
			}));

		this.route.paramMap
			.switchMap((params: ParamMap) => {
				if (params.get('id') === 'new') {
					return new Observable(observer => observer.next(new Activity({})));
				} else {
					return this.activityService.get(params.get('id'));
				}
			})
			.map(data => new Activity(data.records)
			).subscribe(activity => {
				this.activity = activity;
				this.providerCtrl = new FormControl(this.activity.provider_id);
				console.log(this.providerCtrl.value);
				this.initTags();
				this.initScheduleFormCtrls();
				this.declerateDateForms(-1);
				this.categoryCtrl = new FormControl(this.activity.category.id);
				this.targetGroupCtrl = this.activity.target_groups ?
					new FormControl(this.initCtrl(this.activity.target_groups)) : new FormControl();
				this.firstFormGroup = this._formBuilder.group({
					firstCtrl: ['', Validators.required]
				});
			});
	}

	initCtrl(array: any[]): string[] {
		const ids: string[] = [];
		for (const item of array) {
			ids.push(item.id);
		}
		return ids;
	}

	initTags(): void {
		const tagsNames: string[] = [];
		for (const tag of this.activity.tags) {
			tagsNames.push(tag.name);
		}
		this.tagsCtrl = new FormControl(tagsNames.join());
	}

	initScheduleFormCtrls(): void {
		if (this.activity.schedules.length) {
			this.startTimeCtrl = new FormControl(this.activity.schedules[0].startTime);
			this.endTimeCtrl = new FormControl(this.activity.schedules[0].endTime);
			this.startDateCtrl = new FormControl(this.activity.schedules[0].start_date);
			this.endDateCtrl = new FormControl(this.activity.schedules[this.activity.schedules.length - 1].end_date);
			if (this.activity.schedules.length > 1) {
				this.scheduleIsRecurrent = true;
			}
		} else {
			this.startTimeCtrl = new FormControl();
			this.endTimeCtrl = new FormControl();
			this.startDateCtrl = new FormControl();
			this.endDateCtrl = new FormControl();
		}
	}

	containsEntry(any: any, array: any[]): boolean {
		for (const entry of array) {
			if (entry.id === any.id) {
				return true;
			}
		}
		return false;
	}

	generateSchedules(): void {
		if (this.scheduleIsRecurrent) {
			if (!this.activity.schedules) {
				this.activity.schedules = [];
			}
			const currStartDate = new Date(this.startDateCtrl.value);
			const currEndDate = new Date(this.startDateCtrl.value);
			const end: Date = new Date(this.endDateCtrl.value);
			while (currStartDate < end) {
				const currSchedule = new Schedule({});
				currSchedule.startDate = String(currStartDate);
				currSchedule.startTime = this.startTimeCtrl.value;
				currSchedule.endDate = String(currEndDate);
				currSchedule.endTime = this.endTimeCtrl.value;
				this.activity.schedules.push(currSchedule);
				currStartDate.setDate(currStartDate.getDate() + (7 * this.weeklyRythm));
				currEndDate.setDate(currEndDate.getDate() + (7 * this.weeklyRythm));
			}
		} else {
			const oneTimeSchedule: Schedule = new Schedule({});
			oneTimeSchedule.startDate = String(this.startDateCtrl.value);
			oneTimeSchedule.end_date = String(this.endDateCtrl.value);
			oneTimeSchedule.startTime = this.startTimeCtrl.value;
			oneTimeSchedule.endTime = this.endTimeCtrl.value;
			this.activity.schedules = [];
			this.activity.schedules.push(oneTimeSchedule);
		}
		this.declerateDateForms(-1);
	}

	addOneSchedule(): void {
		this.activity.schedules.push(new Schedule({}));
		this.declerateDateForms(this.activity.schedules.length - 1);
	}

	declerateDateForms(i: number): void {
		if (i >= 0) {
			if (this.activity.schedules[i]) {
				this.currentStartDate = new FormControl(new Date(this.activity.schedules[i].start_date));
				this.currentStartTime = new FormControl(String(this.activity.schedules[i].startTime));
				this.currentEndDate = new FormControl(new Date(this.activity.schedules[i].end_date));
				this.currentEndTime = new FormControl(String(this.activity.schedules[i].endTime));
			}
			this.panelNumber = i;
		} else {
			this.currentStartDate = new FormControl();
			this.currentStartTime = new FormControl();
			this.currentEndDate = new FormControl();
			this.currentEndTime = new FormControl();
		}
	}

	changeDate(i: number): void {
		this.activity.schedules[i].start_date = this.currentStartDate.value;
		this.activity.schedules[i].startTime = this.currentStartTime.value;
		this.activity.schedules[i].end_date = this.currentEndDate.value;
		this.activity.schedules[i].endTime = this.currentEndTime.value;
		this.panelNumber = -1;
	}

	removeDateEntry(i: number): void {
		if (!this.toDeleteSchedules) {
			this.toDeleteSchedules = [];
		}
		this.toDeleteSchedules.push(this.activity.schedules[i]);
		if (i === 0) {
			this.removeCompleteSchedule();
		} else {
			this.activity.schedules.splice(i, 1);
		}
	}

	removeCompleteSchedule(): void {
		this.toDeleteSchedules = this.activity.schedules;
		this.activity.schedules = [];
	}

	generateTargetGroupArray(idArray: string[]): Observable<TargetGroup[]> {
		const target_groups = [];
		for (const id of idArray) {
			target_groups.push(this.targetGroups.find(tg => tg.id === id));
		}
		return new Observable(observer => observer.next(target_groups));
	}

	deleteSchedules(): void {
		if (this.toDeleteSchedules) {
			for (const schedule of this.toDeleteSchedules) {
				this.scheduleService.delete(schedule.id).subscribe();
			}
		}
	}

	handleSchedules(): Observable<any[]> {
		const observableAddressArray: Observable<any>[] = [];
		if (this.activity.schedules.length) {
			this.activity.schedules.map(sched => {
				if (sched.id) {
					// currSchedule.activity_id = this.activity.id;
					observableAddressArray.push(this.scheduleService.edit(sched));
				} else {
					// currSchedule.activity_id = this.activity.id;
					console.log('new schedule entry: ', sched);
					observableAddressArray.push(this.scheduleService.add(sched));
				}
			});
		}
		return Observable.forkJoin(observableAddressArray);
	}

	handleTags(): Observable<any[]> {
		const observableTagArray: Observable<any>[] = [];
		this.activity.tags = [];
		this.tagsCtrl.value.split(',').map((tagName) => {
			const currTag: Tag = new Tag();
			currTag.name = tagName;
			observableTagArray.push(this.tagService.add(currTag));
		});
		return Observable.forkJoin(observableTagArray);
	}

	addressChanged(event: any): void {
		if (event.id) {
			this.activity.address_id = event.id;
		}
		this.activity.address = event;
	}

	addressSubmitt(): void {
		this.addressAutocomplete.onSubmit();
	}

	prepareToSubmit(): void {
		if (this.showUser) {
			this.activity.showUser = this.showUser;
		} else {
			this.activity.showUser = false;
		}
		this.activity.provider = this.providers.find(provider => provider.id === this.providerCtrl.value);
		this.activity.provider_id = this.providerCtrl.value;
		this.activity.category = this.categories.find(category => category.id === this.categoryCtrl.value);
		this.activity.category_id = this.categoryCtrl.value;
		this.handleTags().subscribe(tags => {
			tags.map(tag => { if (tag.records) { this.activity.tags.push(tag.records); } });
			this.generateTargetGroupArray(this.targetGroupCtrl.value).
				subscribe(targetGroups => {
					this.activity.target_groups = targetGroups;
				});
		});
	}

	onSubmit(): void {
		this.deleteSchedules();
		this.handleSchedules().subscribe(schedules => {
			schedules.map(schedule => this.activity.schedules.push(new Schedule(schedule.records)));

			if (!this.activity.address.id) {
				this.addressService.add(this.activity.address).subscribe(
					response => {
						this.activity.address = response.records;
						this.activity.address_id = response.records.id;
					}
				);
			} this.saveActivity(this.activity);
		});
		this.back();
	}

	saveActivity(activity: Activity): void {
		if (activity.id) {
			this.activityService.edit(this.activity).subscribe(() => this.back());
		} else {
			this.activityService.add(this.activity).subscribe(() => this.back());
		}
	}

	back(): void {
		this.location.back();
	}


}
