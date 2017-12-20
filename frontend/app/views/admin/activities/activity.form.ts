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

import { Address } from 'app/models/address';
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
import { ValidationService } from 'app/services/validation.service';
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
	// schedules: Schedule[];
	protected user: User;

	isLinear: boolean = true;
	currentStartDate: FormControl;
	currentStartTime: FormControl;
	currentEndDate: FormControl;
	currentEndTime: FormControl;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	thirdFormGroup: FormGroup;

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
		private _formBuilder: FormBuilder,
		public validation: ValidationService,
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
				if (this.activity.provider.id) {
					if (this.providers.indexOf(this.activity.provider) === -1) {
						this.providers.push(this.activity.provider);
					}
				}
				this.declerateDateForms(-1);
				this.firstFormGroup = new FormGroup({
					'providerCtrl': new FormControl(this.activity.provider_id, [
						Validators.required
					]),
					'nameCtrl': new FormControl(this.activity.name, [
						Validators.required
					]),
					'showUserCtrl': new FormControl(this.activity.show_user ? this.activity.show_user : false),
					'descriptionCtrl': new FormControl(this.activity.description),
					'tagsCtrl': new FormControl(this.initTags()),
					'categoryCtrl': new FormControl(this.activity.category.id, [Validators.required]),
					'targetGroupCtrl': new FormControl(this.activity.target_groups)
				});
				this.secondFormGroup = this._formBuilder.group({
				});
				this.thirdFormGroup = this._formBuilder.group({
					'startTimeCtrl': new FormControl(this.activity.schedules[0] ? this.activity.schedules[0].startTime : ''),
					'endTimeCtrl': new FormControl(this.activity.schedules[0] ? this.activity.schedules[0].endTime : ''),
					'startDateCtrl': new FormControl(this.activity.schedules[0] ? this.activity.schedules[0].start_date : ''),
					'endDateCtrl': new FormControl(this.activity.schedules[0] ? this.activity.schedules[this.activity.schedules.length - 1].end_date : ''),
					'weeklyRythmCtrl': new FormControl(0)
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

	initTags(): string {
		const tagsNames: string[] = [];
		for (const tag of this.activity.tags) {
			tagsNames.push(tag.name);
		}
		return tagsNames.join();
	}

	generateSchedules(): void {
		console.log(this.thirdFormGroup.get('startDateCtrl').value);
		if (this.thirdFormGroup.get('weeklyRythmCtrl').value > 0) {
			if (!this.activity.schedules) {
				this.activity.schedules = [];
			}
			const currStartDate = new Date(this.thirdFormGroup.get('startDateCtrl').value);
			const currEndDate = new Date(this.thirdFormGroup.get('startDateCtrl').value);
			const end: Date = new Date(this.thirdFormGroup.get('endDateCtrl').value);
			while (currStartDate < end) {
				const currSchedule = new Schedule({});
				currSchedule.startDate = String(currStartDate);
				currSchedule.startTime = this.thirdFormGroup.get('startTimeCtrl').value;
				currSchedule.endDate = String(currEndDate);
				currSchedule.endTime = this.thirdFormGroup.get('endTimeCtrl').value;
				this.activity.schedules.push(currSchedule);
				currStartDate.setDate(currStartDate.getDate() + (7 * this.thirdFormGroup.get('weeklyRythmCtrl').value));
				currEndDate.setDate(currEndDate.getDate() + (7 * this.thirdFormGroup.get('weeklyRythmCtrl').value));
			}
		} else {
			const oneTimeSchedule: Schedule = new Schedule({});
			oneTimeSchedule.startDate = String(this.thirdFormGroup.get('startDateCtrl').value);
			oneTimeSchedule.end_date = String(this.thirdFormGroup.get('endDateCtrl').value);
			oneTimeSchedule.startTime = this.thirdFormGroup.get('startTimeCtrl').value;
			oneTimeSchedule.endTime = this.thirdFormGroup.get('endTimeCtrl').value;
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
		const observableScheduleArray: Observable<any>[] = [];
		if (this.activity.schedules.length) {
			this.activity.schedules.map(sched => {
				if (sched.id) {
					observableScheduleArray.push(this.scheduleService.edit(sched));
				} else {
					observableScheduleArray.push(this.scheduleService.add(sched));
				}
			});
		}
		this.activity.schedules = [];
		return Observable.forkJoin(observableScheduleArray);
	}

	handleTags(): Observable<any[]> {
		const observableTagArray: Observable<any>[] = [];
		this.activity.tags = [];
		this.firstFormGroup.get('tagsCtrl').value.split(',').map((tagName) => {
			const currTag: Tag = new Tag();
			currTag.name = tagName;
			observableTagArray.push(this.tagService.add(currTag));
		});
		return Observable.forkJoin(observableTagArray);
	}

	addressChanged(event: any): void {
		if (event && event.id) {
			this.activity.address_id = event.id;
		}
		this.activity.address = event;
	}

	addressSubmitt(): void {
		this.addressAutocomplete.onSubmit();
	}

	prepareToSubmit(): void {
		this.activity.name = this.firstFormGroup.get('nameCtrl').value;
		this.activity.description = this.firstFormGroup.get('descriptionCtrl').value;
		this.activity.show_user = this.firstFormGroup.get('showUserCtrl').value;
		this.activity.provider = this.providers.find(provider => provider.id === this.firstFormGroup.get('providerCtrl').value);
		this.activity.provider_id = this.firstFormGroup.get('providerCtrl').value;
		this.activity.category = this.categories.find(category => category.id === this.firstFormGroup.get('categoryCtrl').value);
		this.activity.category_id = this.firstFormGroup.get('categoryCtrl').value;
		this.handleTags().subscribe(tags => {
			tags.map(tag => { if (tag.records) { this.activity.tags.push(tag.records); } });
		});
		this.generateTargetGroupArray(this.firstFormGroup.get('targetGroupCtrl').value).
			subscribe(targetGroups => {
				this.activity.target_groups = targetGroups;
			});
		this.deleteSchedules();
		this.handleSchedules().subscribe(schedules => {
			schedules.map(schedule => {
				if (!this.activity.schedules.find(currSched => new Schedule(schedule.records).compareTo(new Schedule(currSched)))) {
					this.activity.schedules.push(new Schedule(schedule.records));
				}
			});
		});
		if (this.activity.address && !this.activity.address.id) {
			this.activity.address.suburb = null;
			this.addressService.add(this.activity.address).
				map(response => new Address(response.records)).subscribe(
				address => {
					this.activity.address = address;
					this.activity.address.suburb = address.suburb;
					this.activity.address_id = address.id;
				});
		}
	}

	onSubmit(): void {
		this.activity.provider = null;
		this.activity.category = null;
		this.activity.address = null;
		if (this.activity.id) {
			this.activityService.edit(this.activity).subscribe(() => this.back());
		} else {
			this.activityService.add(this.activity).subscribe(() => this.back());
		}
	}

	back(): void {
		this.location.back();
	}


}
