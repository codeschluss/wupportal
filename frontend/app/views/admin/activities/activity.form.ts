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
import { Schedule } from 'app/models/schedule';
import { Recurrence } from 'app/models/recurrence';
import { WeekDay } from 'app/models/week-day';

import {
	DataServiceFactory,
	AddressService,
	WeekDaysService,
	SuburbService,
	TagService,
	TargetGroupService
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
		{ provide: WeekDaysService, useFactory: DataServiceFactory(WeekDaysService), deps: [HttpClient, AuthenticationService] }
	]
})

export class ActivityFormComponent implements OnInit {

	activity: Activity;
	targetGroups: TargetGroup[];
	weekDays: WeekDay[];
	addressCtrl: FormControl;
	tagsCtrl: FormControl;
	weekDaysCtrl: FormControl;
	targetGroupCtrl: FormControl;
	addresses: Address[];
	filteredAddresses: Observable<Address[]>;
	nominatimAddress: Address;

	constructor(
		private activityService: ActivityService,
		@Inject(AddressService) private addressService: DataService,
		@Inject(TagService) private tagService: DataService,
		@Inject(TargetGroupService) private targetGroupService: DataService,
		@Inject(WeekDaysService) private weekDaysService: DataService,
		private location: Location,
		public route: ActivatedRoute,
		public constants: Constants,
		private nominatimService: NominatimService,
		private suburbSelectDialog: MatDialog,
		private controlAddressDialog: MatDialog,
	) {
		this.addressService.getAll().subscribe((data) => this.addresses = data.records);
		this.targetGroupService.getAll().subscribe((data) => this.targetGroups = data.records);
		this.weekDaysService.getAll().subscribe((data) => this.weekDays = data.records);
	}

	ngOnInit(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) =>
				this.activityService.get(params.get('id'))).subscribe((data) => {
					this.activity = data.records;
					this.initTags();
					this.addressCtrl = new FormControl(data.records.address);
					this.targetGroupCtrl = data.records.target_groups ? new FormControl(this.initCtrl(data.records.target_groups)) : new FormControl();
					this.weekDaysCtrl = (data.records.schedule && data.records.schedule.recurrence && data.records.schedule.recurrence.week_days) ?
						new FormControl(this.initCtrl(data.records.schedule.recurrence.week_days)) : new FormControl();
					this.filteredAddresses = this.addressCtrl.valueChanges
						.startWith(<any>[])
						.map(address => address && typeof address === 'object' ? this.toString(address) : address)
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
			this.toString(address).toLocaleLowerCase().indexOf(name.toLowerCase()) !== -1);
	}

	toString(address: any): string {
		if (typeof address === 'string') {
			return address;
		}
		if (typeof address === 'object') {
			return (address.street + ' ' + address.house_number + ' ' + address.postal_code + ' ' +
				address.place + ' ' + (address.suburb ? address.suburb.name : ''));
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

	compareAddresses(address1: Address, address2: Address): boolean {
		if (address1.street.toLocaleLowerCase().localeCompare(address2.street.toLocaleLowerCase()) === 0 &&
			address1.house_number.toLocaleLowerCase().localeCompare(address2.house_number.toLocaleLowerCase()) === 0 &&
			address1.postal_code.toLocaleLowerCase().localeCompare(address2.postal_code.toLocaleLowerCase()) === 0 &&
			address1.place.toLocaleLowerCase().localeCompare(address2.place.toLocaleLowerCase()) === 0
		) {
			return true;
		} else {
			return false;
		}
	}

	checkAddress(address: Address): boolean {
		if (address.house_number &&
			address.place &&
			address.postal_code &&
			address.street) {
			return true;
		} else {
			return false;
		}
	}

	generateTargetGroupArray(idArray: string[]): Observable<TargetGroup[]> {
		const target_groups = [];
		for (const id of idArray) {
			target_groups.push(this.targetGroups.find(tg => tg.id === id));
		}
		return new Observable(observer => observer.next(target_groups));
	}

	generateSchedule(): void {
		this.activity.schedule = new Schedule();
	}

	generateRecurrence(): void {
		this.activity.schedule.recurrence = new Recurrence();
	}

	removeRecurrence(): void {
		this.activity.schedule.recurrence = null;
	}

	onSubmit(): void {
		this.activity.tags = [];
		this.handleTags().subscribe(tags => {
			tags.map((tag) => this.activity.tags.push(tag.records));
			this.generateTargetGroupArray(this.targetGroupCtrl.value).
				subscribe(targetGroups => {
					this.activity.target_groups = targetGroups;
					this.activityService.edit(this.activity).subscribe();
				});
		});
		if (typeof this.addressCtrl.value === 'string') {
			this.nominatimService.get(this.toString(this.addressCtrl.value)).subscribe((data) => {
				this.nominatimAddress = data;
				if (!this.checkAddress(this.nominatimAddress)) {
					this.controlAddress(this.nominatimAddress).subscribe(result => {
						this.nominatimAddress = result;
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
			if (this.addressCtrl.value.id) {
				if (this.addressCtrl.value.id !== this.activity.address_id) {
					this.activity.address_id = this.addressCtrl.value.id;
				}
			}
			this.activityService.edit(this.activity).subscribe(() => this.back());
		}
	}

	findExistingAddress(address: Address): boolean {
		for (const currAddress of this.addresses) {
			if (this.compareAddresses(currAddress, this.nominatimAddress)) {
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
					+ this.toString(newAddress),
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
