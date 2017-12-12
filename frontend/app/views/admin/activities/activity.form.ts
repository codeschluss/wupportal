import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Activity } from 'app/models/activity';
import { Address } from 'app/models/address';
import { TargetGroup } from 'app/models/target-group';
import { Tag } from 'app/models/tag';
import { Category } from 'app/models/category';
import { Schedule } from 'app/models/schedule';

import {
	DataServiceFactory,
	AddressService,
	SuburbService,
	TagService,
	TargetGroupService,
	CategoryService,
	ScheduleService
} from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { NominatimService } from 'app/services/nominatim';
import { AddressFormComponent } from 'app/views/admin/addresses/address.form';
import { ActivityService } from 'app/services/activity.service';
import { Constants } from 'app/services/constants';
import { SuburbSelectionComponent } from 'app/views/admin/dialog/popup.suburb.selection';
import { Object } from 'openlayers';
import { Subscription } from 'rxjs/Subscription';


@Component({
	selector: 'activity-form',
	templateUrl: 'activity.form.html',
	styleUrls: ['../../../app.component.css'],
	providers: [
		ActivityService,
		{ provide: AddressService, useFactory: DataServiceFactory(AddressService), deps: [HttpClient, AuthenticationService] },
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
	addressCtrl: FormControl;
	tagsCtrl: FormControl;
	categoryCtrl: FormControl;
	weekDaysCtrl: FormControl;
	startTimeCtrl: FormControl;
	startDateCtrl: FormControl;
	endTimeCtrl: FormControl;
	endDateCtrl: FormControl;
	targetGroupCtrl: FormControl;
	addresses: Address[] = [];
	filteredAddresses: Observable<Address[]>;
	nominatimAddress: Address;
	showRecurrence: boolean;
	scheduleIsRecurrent: boolean = false;
	weeklyRythm: number = 1;
	currentStartDate: FormControl;
	currentStartTime: FormControl;
	currentEndDate: FormControl;
	currentEndTime: FormControl;

	constructor(
		private activityService: ActivityService,
		@Inject(AddressService) private addressService: DataService,
		@Inject(ScheduleService) private scheduleService: DataService,
		@Inject(TagService) private tagService: DataService,
		@Inject(TargetGroupService) private targetGroupService: DataService,
		@Inject(CategoryService) private categoriesService: DataService,
		private location: Location,
		public route: ActivatedRoute,
		public constants: Constants,
		private nominatimService: NominatimService,
		private suburbSelectDialog: MatDialog,
		private controlAddressDialog: MatDialog,
	) {
		this.addressService.getAll().subscribe((data) => {
			for (const add of data.records) {
				this.addresses.push(new Address(add));
			}
		});
		this.targetGroupService.getAll().subscribe((data) => this.targetGroups = data.records);
		this.categoriesService.getAll().subscribe((data) => this.categories = data.records);
	}

	ngOnInit(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) =>
				this.activityService.get(params.get('id')))
			.map(data =>
				new Activity(data.records)
			).subscribe(activity => {
				this.activity = activity;
				this.initTags();
				if (this.activity.schedules.length) {
					this.startTimeCtrl = new FormControl(this.activity.schedules[0].startTime);
					this.endTimeCtrl = new FormControl(this.activity.schedules[0].endTime);
					this.startDateCtrl = new FormControl(this.activity.schedules[0].start_date);
					this.endDateCtrl = new FormControl(this.activity.schedules[this.activity.schedules.length - 1].end_date);
					this.declerateDateForms(0);
					if (this.activity.schedules.length > 1) {
						this.scheduleIsRecurrent = true;
					}
				} else {
					this.startTimeCtrl = new FormControl();
					this.endTimeCtrl = new FormControl();
					this.startDateCtrl = new FormControl();
					this.endDateCtrl = new FormControl();
				}

				this.addressCtrl = new FormControl(this.activity.address);
				this.categoryCtrl = new FormControl(this.activity.category.id);
				this.targetGroupCtrl = this.activity.target_groups ?
					new FormControl(this.initCtrl(this.activity.target_groups)) : new FormControl();
				this.filteredAddresses = this.addressCtrl.valueChanges
					.startWith(<any>[])
					.map(address => address && typeof address === 'object' ? new Address(address).toString : address)
					.map(address => address ? this.filterAddresses(address) : this.addresses.slice());
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

	filterAddresses(name: string): Address[] {
		return this.addresses.filter(address =>
			address.toString.toLocaleLowerCase().indexOf(name.toLowerCase()) !== -1);
	}

	toString(address: any): string {
		if (typeof address === 'string') {
			return address;
		}
		if (typeof address === 'object') {
			return new Address(address).toString;
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
				currSchedule.startDate = currStartDate.toISOString().slice(0, 19).replace('T', ' ');
				currSchedule.startTime = this.startTimeCtrl.value;
				currSchedule.endDate = currEndDate.toISOString().slice(0, 19).replace('T', ' ');
				currSchedule.endTime = this.endTimeCtrl.value;
				this.activity.schedules.push(currSchedule);
				currStartDate.setDate(currStartDate.getDate() + (7 * this.weeklyRythm));
				currEndDate.setDate(currEndDate.getDate() + (7 * this.weeklyRythm));
			}
		} else {
			const oneTimeSchedule: Schedule = new Schedule({});
			oneTimeSchedule.startDate = new Date(this.startDateCtrl.value).toISOString().slice(0, 19).replace('T', ' ');
			oneTimeSchedule.end_date = new Date(this.endDateCtrl.value).toISOString().slice(0, 19).replace('T', ' ');
			oneTimeSchedule.startTime = this.startTimeCtrl.value;
			oneTimeSchedule.startTime = this.endTimeCtrl.value;
			this.activity.schedules = [oneTimeSchedule];
		}
	}

	declerateDateForms(i: number): void {
		this.panelNumber = i;
		this.currentStartDate = new FormControl(this.activity.schedules[i].start_date);
		this.currentStartTime = new FormControl(String(this.activity.schedules[i].startTime));
		this.currentEndDate = new FormControl(this.activity.schedules[i].end_date);
		this.currentEndTime = new FormControl(String(this.activity.schedules[i].endTime));
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

	handleSchedules(): void {
		// const observableScheduleArray: Observable<any>[] = [];
		if (this.activity.schedules.length) {
			this.activity.schedules.map(sched => {
				const currSchedule: Schedule = new Schedule(sched);
				if (sched.id) {
					this.scheduleService.delete(currSchedule.id).subscribe();
				}
				currSchedule.id = null;
				currSchedule.activity_id = this.activity.id;
				this.scheduleService.add(currSchedule).subscribe();
			});
		}
		this.activity.schedules = [];
		// return Observable.forkJoin();
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

	onSubmit(): void {
		this.activity.category = null;
		this.activity.provider = null;
		this.activity.category_id = this.categoryCtrl.value;

		this.deleteSchedules();
		this.handleTags().subscribe(tags => {
			tags.map(tag => { if (tag.records) { this.activity.tags.push(tag.records); } });
			this.handleSchedules();
			this.generateTargetGroupArray(this.targetGroupCtrl.value).
				subscribe(targetGroups => {
					this.activity.target_groups = targetGroups;
				});
		});

		// if (typeof this.addressCtrl.value === 'string') {
		// 	this.nominatimService.get(this.addressCtrl.value).subscribe(data => {
		// 		this.nominatimAddress = new Address(data);
		// 		if (!this.nominatimAddress.checkAddress()) {
		// 			this.controlAddress(this.nominatimAddress).subscribe(result => {
		// 				this.nominatimAddress = new Address(result);
		// 				if (this.findExistingAddress(this.nominatimAddress)) {
		// 					this.back();
		// 					return;
		// 				}
		// 				this.activity.address = null;
		// 				this.nominatimAddress.suburb = null;
		// 				this.openDialog(this.nominatimAddress);
		// 			});
		// 		} else {
		// 			if (this.findExistingAddress(this.nominatimAddress)) {
		// 				this.back();
		// 				return;
		// 			}
		// 			this.activity.address = null;
		// 			this.nominatimAddress.suburb = null;
		// 			this.openDialog(this.nominatimAddress);
		// 		}
		// 	});
		// } else {
		// 	this.activity.address = null;
		// 	this.activity.address_id = this.addressCtrl.value.id;
		// 	this.activityService.edit(this.activity).subscribe(() => this.back());
		// }
	}

	findExistingAddress(address: Address): boolean {
		for (const currAddress of this.addresses) {
			if (currAddress.compareTo(address)) {
				this.activity.address_id = currAddress.id;
				this.activityService.edit(this.activity).subscribe();
				return true;
			}
		}
		return false;
	}

	controlAddress(address: Address): Observable<Address> {
		const dialogRef = this.controlAddressDialog.open(AddressFormComponent, {
			width: '80%',
			data: {
				name: '',
				message: 'Sie können die eingegebene Addresse hier ändern:',
				address: address
			}
		});
		return dialogRef.afterClosed();
	}

	openDialog(newAddress: Address): void {
		const dialogRef = this.suburbSelectDialog.open(SuburbSelectionComponent, {
			width: '250px',
			data: {
				name: '',
				message: 'Sie haben eien neue Adresse eingegeben. Bitte geben Sie den entsprechenden Stadtteil ein.'
					+ newAddress.toString,
				address: newAddress
			}
		});

		dialogRef.afterClosed().subscribe(() => {
			this.addressService.add(this.nominatimAddress).subscribe((response) => {
				this.activity.address_id = response.records.id;
				this.activityService.edit(this.activity).subscribe();
				this.back();
			});
		});
	}

	back(): void {
		this.location.back();
	}

}
