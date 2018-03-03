import { Component, Inject, ViewChild } from '@angular/core';
import { Location, WeekDay } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
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
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { RRule, RRuleSet, Weekday } from 'rrule';

// @Author: Pseipel

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
		{ provide: ScheduleService, useFactory: DataServiceFactory(ScheduleService), deps: [HttpClient, AuthenticationService] },
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{
			provide: MAT_DATE_FORMATS, useValue: {
				parse: {
					dateInput: 'LL',
				},
				display: {
					dateInput: 'LL',
					monthYearLabel: 'MMM YYYY',
					dateA11yLabel: 'LL',
					monthYearA11yLabel: 'MMMM YYYY',
				},
			}
		},
	]
})

export class ActivityFormComponent implements OnInit {

	activity: Activity;
	panelNumber: number;
	targetGroups: TargetGroup[];
	toDeleteSchedules: Schedule[];
	categories: Category[];
	providers: Provider[] = [];
	user: User = new User();

	currentStartDate: FormControl;
	currentStartTimeHour: FormControl;
	currentStartTimeMinute: FormControl;
	currentEndDate: FormControl;
	currentEndTimeHour: FormControl;
	currentEndTimeMinute: FormControl;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	thirdFormGroup: FormGroup;
	separatorKeysCodes: any[] = [ENTER, COMMA];

	@ViewChild('addressAutocompleteComponent') addressAutocomplete: AddressAutocompleteComponent;

	constructor(
		private adapter: DateAdapter<any>,
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
		this.adapter.setLocale(this.constants.countryCode);

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
					'tagsCtrl': new FormControl(''),
					'categoryCtrl': new FormControl(this.activity.category.id, [Validators.required]),
					'targetGroupCtrl': new FormControl(this.activity.target_groups)
				});
				this.secondFormGroup = new FormGroup({
					'addressCtrl': new FormControl(this.activity.address.isValid(), [Validators.required])
				});
				this.thirdFormGroup = new FormGroup({
					'startTimeHourCtrl': new FormControl(this.activity.schedules[0] ?
						moment(this.activity.schedules[0].startTime).hour() : moment().hour()),
					'startTimeMinuteCtrl': new FormControl(this.activity.schedules[0] ?
						moment(this.activity.schedules[0].startTime).minute() : moment().minute()),
					'endTimeHourCtrl': new FormControl(this.activity.schedules[0] ?
						moment(this.activity.schedules[0].endTime).hour() : moment().hour()),
					'endTimeMinuteCtrl': new FormControl(this.activity.schedules[0] ?
						moment(this.activity.schedules[0].endTime).minute() : moment().minute()),
					'startDateCtrl': new FormControl(this.activity.schedules[0] ?
						moment(this.activity.schedules[0].startDate) : moment()),
					'endDateCtrl': new FormControl(this.activity.schedules[0] ?
						moment(this.activity.schedules[this.activity.schedules.length - 1].end_date) : moment()),
					'rythmPeriodCtrl': new FormControl(1),
					'weekdaysCtrl': new FormControl([1]),
					'weekdayNumberCtrl': new FormControl(1),
					'monthlyRecurrenceCtrl': new FormControl('monthDate'),
					'monthDateCtrl': new FormControl(1),
					'rythmUnitCtrl': new FormControl('unique'),
					'schedulesCtrl': new FormControl(this.activity.schedules, [Validators.required])
				});

				this.firstFormGroup.get('nameCtrl').valueChanges.subscribe(name => { this.activity.name = name; });
				this.firstFormGroup.get('descriptionCtrl').valueChanges.subscribe(description => { this.activity.description = description; });
				this.firstFormGroup.get('providerCtrl').valueChanges.subscribe(() =>
					this.activity.provider = this.providers.find(provider => provider.id === this.firstFormGroup.get('providerCtrl').value));
				this.firstFormGroup.get('providerCtrl').valueChanges.subscribe(providerID => { this.activity.provider_id = providerID; });
				this.firstFormGroup.get('showUserCtrl').valueChanges.subscribe(showUser => { this.activity.show_user = showUser; });
				this.firstFormGroup.get('categoryCtrl').valueChanges.subscribe(() =>
					this.activity.category = this.categories.find(category => category.id === this.firstFormGroup.get('categoryCtrl').value));
				this.firstFormGroup.get('categoryCtrl').valueChanges.subscribe(catID => { this.activity.category_id = catID; });
				this.userService.get(this.activity.provider.user_id).subscribe(user => {
					this.user = new User(user.records);
				});
			});
	}

	addTag(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		const currTag = new Tag();
		currTag.name = value.trim().toLowerCase();
		this.activity.tags.push(currTag);

		if (input) {
			input.value = '';
		}
	}

	removeTag(tag: Tag): void {
		const index = this.activity.tags.indexOf(tag);
		if (index >= 0) {
			this.activity.tags.splice(index, 1);
		}
	}


	initCtrl(array: any[]): string[] {
		const ids: string[] = [];
		for (const item of array) {
			ids.push(item.id);
		}
		return ids;
	}

	generateSchedules(): void {
		if (this.thirdFormGroup.get('rythmPeriodCtrl').value > 0 && this.thirdFormGroup.get('rythmUnitCtrl').value !== 'unique') {
			if (!this.activity.schedules) {
				this.activity.schedules = [];
			}
			const startDate = moment(this.thirdFormGroup.get('startDateCtrl').value);
			const endDate = moment(this.thirdFormGroup.get('endDateCtrl').value);
			const recurrenceRange = { start: startDate, end: endDate };

			let rule;

			switch (this.thirdFormGroup.get('rythmUnitCtrl').value) {
				case 'years':
					rule = new RRule({
						freq: RRule.YEARLY,
						interval: this.thirdFormGroup.get('rythmPeriodCtrl').value,
						dtstart: startDate.toDate(),
						until: endDate.toDate()
					});
					break;
				case 'months':
					if (this.thirdFormGroup.get('monthlyRecurrenceCtrl').value === 'monthDate') {
						if (startDate.date() > this.thirdFormGroup.get('monthDateCtrl').value) {
							startDate.add(this.thirdFormGroup.get('rythmPeriodCtrl').value, 'month');
						}
						startDate.date(this.thirdFormGroup.get('monthDateCtrl').value);
						rule = new RRule({
							freq: RRule.MONTHLY,
							interval: this.thirdFormGroup.get('rythmPeriodCtrl').value,
							dtstart: startDate.toDate(),
							until: endDate.toDate()
						});
					} else {
						const byweekdayArray = [];
						for (let i = 0; i < this.thirdFormGroup.get('weekdaysCtrl').value.length; i++) {
							let weekday;
							switch (this.thirdFormGroup.get('weekdaysCtrl').value[i]) {
								case 0:
									weekday = RRule.MO;
									break;
								case 1:
									weekday = RRule.TU;
									break;
								case 2:
									weekday = RRule.WE;
									break;
								case 3:
									weekday = RRule.TH;
									break;
								case 4:
									weekday = RRule.FR;
									break;
								case 5:
									weekday = RRule.SA;
									break;
								default:
									weekday = RRule.SU;
							}
							byweekdayArray.push(weekday.nth(
								this.thirdFormGroup.get('weekdayNumberCtrl').value === 5 ? -1 : this.thirdFormGroup.get('weekdayNumberCtrl').value)
							);
						}

						rule = new RRule({
							freq: RRule.MONTHLY,
							interval: this.thirdFormGroup.get('rythmPeriodCtrl').value,
							byweekday: byweekdayArray,
							dtstart: startDate.toDate(),
							until: endDate.toDate()
						});
					}
					break;
				case 'weeks':
					rule = new RRule({
						freq: RRule.WEEKLY,
						interval: this.thirdFormGroup.get('rythmPeriodCtrl').value,
						byweekday: this.thirdFormGroup.get('weekdaysCtrl').value,
						dtstart: startDate.toDate(),
						until: endDate.toDate()
					});
					break;
				default:
					rule = new RRule({
						freq: RRule.DAILY,
						interval: this.thirdFormGroup.get('rythmPeriodCtrl').value,
						dtstart: startDate.toDate(),
						until: endDate.toDate()
					});
			}
			const allDates: Date[] = rule.all();
			allDates.map(date => {
				const currSchedule = new Schedule({});
				currSchedule.startDate = moment(date).format();
				currSchedule.startTimeHour = this.thirdFormGroup.get('startTimeHourCtrl').value;
				currSchedule.startTimeMinute = this.thirdFormGroup.get('startTimeMinuteCtrl').value;
				currSchedule.endDate = moment(date).format();
				currSchedule.endTimeHour = this.thirdFormGroup.get('endTimeHourCtrl').value;
				currSchedule.endTimeMinute = this.thirdFormGroup.get('endTimeMinuteCtrl').value;
				this.activity.schedules.push(currSchedule);
			});
		} else {
			const oneTimeSchedule: Schedule = new Schedule({});
			oneTimeSchedule.startDate = this.thirdFormGroup.get('startDateCtrl').value;
			oneTimeSchedule.endDate = this.thirdFormGroup.get('endDateCtrl').value;
			oneTimeSchedule.startTimeHour = this.thirdFormGroup.get('startTimeHourCtrl').value;
			oneTimeSchedule.startTimeMinute = this.thirdFormGroup.get('startTimeMinuteCtrl').value;
			oneTimeSchedule.endTimeHour = this.thirdFormGroup.get('endTimeHourCtrl').value;
			oneTimeSchedule.endTimeMinute = this.thirdFormGroup.get('endTimeMinuteCtrl').value;
			this.activity.schedules = [];
			this.activity.schedules.push(oneTimeSchedule);
		}
		this.declerateDateForms(-1);
		this.thirdFormGroup.get('schedulesCtrl').setValue(this.activity.schedules);
	}

	addOneSchedule(): void {
		this.activity.schedules.push(new Schedule({}));
		this.declerateDateForms(this.activity.schedules.length - 1);
	}

	declerateDateForms(i: number): void {
		if (i >= 0) {
			if (this.activity.schedules[i]) {
				this.currentStartDate = new FormControl(moment(this.activity.schedules[i].start_date).format());
				this.currentStartTimeHour = new FormControl(moment(this.activity.schedules[i].startTime).hour());
				this.currentStartTimeMinute = new FormControl(moment(this.activity.schedules[i].startTime).minute());
				this.currentEndDate = new FormControl(moment(this.activity.schedules[i].end_date).format());
				this.currentEndTimeHour = new FormControl(moment(this.activity.schedules[i].endTime).hour());
				this.currentEndTimeMinute = new FormControl(moment(this.activity.schedules[i].endTime).minute());
			}
			this.panelNumber = i;
		} else {
			this.currentStartDate = new FormControl();
			this.currentStartTimeHour = new FormControl();
			this.currentStartTimeMinute = new FormControl();
			this.currentEndDate = new FormControl();
			this.currentEndTimeHour = new FormControl();
			this.currentEndTimeMinute = new FormControl();
		}
	}

	changeDate(i: number): void {
		this.activity.schedules[i].startDate = this.currentStartDate.value;
		this.activity.schedules[i].startTimeHour = this.currentStartTimeHour.value;
		this.activity.schedules[i].startTimeMinute = this.currentStartTimeMinute.value;
		this.activity.schedules[i].endDate = this.currentEndDate.value;
		this.activity.schedules[i].endTimeHour = this.currentEndTimeHour.value;
		this.activity.schedules[i].endTimeMinute = this.currentEndTimeMinute.value;
		this.panelNumber = -1;
	}

	removeDateEntry(i: number): void {
		if (!this.toDeleteSchedules) {
			this.toDeleteSchedules = [];
			this.thirdFormGroup.get('startDateCtrl').setValue(moment());
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
		this.thirdFormGroup.get('schedulesCtrl').setValue(this.activity.schedules);
	}

	generateTargetGroupArray(idArray: string[]): Observable<TargetGroup[]> {
		const target_groups = [];
		for (const id of idArray) {
			target_groups.push(this.targetGroups.find(tg => tg.id === id));
		}
		return new Observable(observer => observer.next(target_groups));
	}

	handleTags(): Observable<any[]> {
		const observableTagArray: Observable<any>[] = [];
		this.activity.tags = [];
		const tagsArray = this.firstFormGroup.get('tagsCtrl').value.split(',');
		tagsArray.map(tagName => {
			const currTag = new Tag();
			currTag.name = tagName;
			observableTagArray.push(this.tagService.add(currTag));
		});
		return Observable.forkJoin(observableTagArray);
	}

	deleteSchedules(): void {
		if (this.toDeleteSchedules) {
			for (const schedule of this.toDeleteSchedules) {
				if (schedule.id) {
					this.scheduleService.delete(schedule.id).subscribe();
				}
			}
		}
	}

	addressSubmit(): void {
		const addressObservable = this.addressAutocomplete.getAddress();
		if (addressObservable) {
			addressObservable.subscribe(address => {
				this.activity.address = address;
				this.activity.address_id = address.id;
				this.secondFormGroup.get('addressCtrl').setValue(this.activity.address);
			});
		}
	}

	resetAddress(): void {
		this.activity.address = new Address();
		this.secondFormGroup.get('addressCtrl').setValue('');
	}

	onSubmit(): void {
		this.activity.provider = null;
		this.activity.category = null;
		this.activity.address = null;
		this.deleteSchedules();
		this.generateTargetGroupArray(this.firstFormGroup.get('targetGroupCtrl').value).
			subscribe(targetGroups => {
				this.activity.target_groups = targetGroups;
			});
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

