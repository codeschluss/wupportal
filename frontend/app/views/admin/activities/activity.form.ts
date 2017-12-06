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
import { Recurrence } from 'app/models/recurrence';
import { WeekDay } from 'app/models/week-day';

import {
	DataServiceFactory,
	AddressService,
	WeekDaysService,
	SuburbService,
	TagService,
	TargetGroupService,
	CategoryService
} from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { NominatimService } from 'app/services/nominatim';
import { AddressFormComponent } from 'app/views/admin/addresses/address.form';
import { ActivityService } from 'app/services/activity.service';
import { Constants } from 'app/services/constants';
import { SuburbSelectionComponent } from 'app/views/admin/dialog/popup.suburb.selection';


@Component({
	selector: 'activity-form',
	templateUrl: 'activity.form.html',
	styleUrls: ['../../../app.component.css'],
	providers: [
		ActivityService,
		{ provide: AddressService, useFactory: DataServiceFactory(AddressService), deps: [HttpClient, AuthenticationService] },
		{ provide: TagService, useFactory: DataServiceFactory(TagService), deps: [HttpClient, AuthenticationService] },
		{ provide: TargetGroupService, useFactory: DataServiceFactory(TargetGroupService), deps: [HttpClient, AuthenticationService] },
		{ provide: WeekDaysService, useFactory: DataServiceFactory(WeekDaysService), deps: [HttpClient, AuthenticationService] },
		{ provide: CategoryService, useFactory: DataServiceFactory(CategoryService), deps: [HttpClient, AuthenticationService] }
	]
})

export class ActivityFormComponent implements OnInit {

	activity: Activity;
	targetGroups: TargetGroup[];
	weekDays: WeekDay[];
	categories: Category[];
	addressCtrl: FormControl;
	tagsCtrl: FormControl;
	categoryCtrl: FormControl;
	weekDaysCtrl: FormControl;
	startTimeCtrl: FormControl;
	endTimeCtrl: FormControl;
	targetGroupCtrl: FormControl;
	addresses: Address[] = [];
	filteredAddresses: Observable<Address[]>;
	nominatimAddress: Address;
	showRecurrence: boolean;
	scheduleIsRecurrent: boolean;

	constructor(
		private activityService: ActivityService,
		@Inject(AddressService) private addressService: DataService,
		@Inject(TagService) private tagService: DataService,
		@Inject(TargetGroupService) private targetGroupService: DataService,
		@Inject(WeekDaysService) private weekDaysService: DataService,
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
		this.weekDaysService.getAll().subscribe((data) => this.weekDays = data.records);
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
				this.activity.schedule.recurrence ? this.scheduleIsRecurrent = true : this.scheduleIsRecurrent = false;
				this.initTags();
				this.activity.schedule.recurrence ? this.showRecurrence = true : this.showRecurrence = false;
				this.addressCtrl = new FormControl(this.activity.address);
				this.categoryCtrl = new FormControl(this.activity.category.id);
				this.startTimeCtrl = new FormControl(this.activity.schedule.startTime);
				this.endTimeCtrl = new FormControl(this.activity.schedule.endTime);
				this.targetGroupCtrl = this.activity.target_groups ?
					new FormControl(this.initCtrl(this.activity.target_groups)) : new FormControl();
				this.weekDaysCtrl = (this.activity.schedule && this.activity.schedule.recurrence && this.activity.schedule.recurrence.week_days) ?
					new FormControl(this.initCtrl(this.activity.schedule.recurrence.week_days)) : new FormControl();
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

	generateTargetGroupArray(idArray: string[]): Observable<TargetGroup[]> {
		const target_groups = [];
		for (const id of idArray) {
			target_groups.push(this.targetGroups.find(tg => tg.id === id));
		}
		return new Observable(observer => observer.next(target_groups));
	}

	generateSchedule(): void {
		this.activity.schedule = new Schedule({});
	}

	onSubmit(): void {
		this.activity.tags = [];
		this.activity.schedule = null;
		this.activity.schedule_id = null;
		this.handleTags().subscribe(tags => {
			tags.map((tag) => this.activity.tags.push(tag.records));
			this.generateTargetGroupArray(this.targetGroupCtrl.value).
				subscribe(targetGroups => {
					this.activity.target_groups = targetGroups;
					this.activityService.edit(this.activity).subscribe();
				});

			// this.activity.schedule.startTime = this.startTimeCtrl.value;
			// this.activity.schedule.endTime = this.endTimeCtrl.value;
			// this.activity.category_id = this.categoryCtrl.value;

			if (typeof this.addressCtrl.value === 'string') {
				this.nominatimService.get(this.addressCtrl.value).subscribe(data => {
					this.nominatimAddress = new Address(data);
					if (!this.nominatimAddress.checkAddress) {
						this.controlAddress(this.nominatimAddress).subscribe(result => {
							this.nominatimAddress = new Address(result);
							if (this.findExistingAddress(this.nominatimAddress)) {
								this.back();
								return;
							}
							this.activity.address = null;
							this.openDialog(this.nominatimAddress);
						});
					} else {
						if (this.findExistingAddress(this.nominatimAddress)) {
							this.back();
							return;
						}
						this.activity.address = null;
						this.openDialog(this.nominatimAddress);
					}
				});
			} else {
				this.activity.address = null;
				this.activity.address_id = this.addressCtrl.value.id;
				this.activityService.edit(this.activity).subscribe(() => this.back());
			}
		});
	}

	findExistingAddress(address: Address): boolean {
		for (const currAddress of this.addresses) {
			if (currAddress.compareTo(this.nominatimAddress)) {
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

	handleTags(): Observable<any[]> {
		const observableTagArray: Observable<Tag>[] = [];
		this.tagsCtrl.value.split(',').map((tagName) => {
			const currTag: Tag = new Tag();
			currTag.name = tagName;
			observableTagArray.push(this.tagService.add(currTag));
		});
		return Observable.forkJoin(observableTagArray);
	}

	back(): void {
		this.location.back();
	}

}
