import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Address } from 'app/models/address';

import {
	DataServiceFactory,
	AddressService,
	SuburbService
} from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { NominatimService } from 'app/services/nominatim';
import { AddressFormComponent } from 'app/views/admin/addresses/address.form';
import { Constants } from 'app/services/constants';
import { SuburbSelectionComponent } from 'app/views/admin/dialog/popup.suburb.selection';
import { Object } from 'openlayers';
import { Subscription } from 'rxjs/Subscription';
import { generate } from 'rxjs/observable/generate';


@Component({
	selector: 'address-autocomplete-form',
	templateUrl: 'address.autocomplete.html',
	styleUrls: ['../../../app.component.css'],
	providers: [
		{ provide: AddressService, useFactory: DataServiceFactory(AddressService), deps: [HttpClient, AuthenticationService] }
	]
})

export class AddressAutocompleteComponent implements OnInit {

	addressCtrl: FormControl;
	addresses: Address[] = [];
	filteredAddresses: Observable<Address[]>;
	nominatimAddress: Address;

	@Input() address: Address;
	@Output() changedAddress: EventEmitter<Address> = new EventEmitter<Address>();

	constructor(
		@Inject(AddressService) private addressService: DataService,
		public constants: Constants,
		private suburbSelectDialog: MatDialog,
		private controlAddressDialog: MatDialog,
		private nominatimService: NominatimService,
		public authService: AuthenticationService
	) {
		this.addressService.getAll().subscribe((response) => {
			for (const add of response.records) {
				this.addresses.push(new Address(add));
			}
		});
	}

	ngOnInit(): void {
		this.addressCtrl = new FormControl(this.address);
		this.filteredAddresses = this.addressCtrl.valueChanges
			.startWith(<any>[])
			.map(address => address && typeof address === 'object' ? new Address(address).toString : address)
			.map(address => address ? this.filterAddresses(address) : this.addresses.slice());
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

	onSubmit(): void {
		if (typeof this.addressCtrl.value === 'string') {
			this.handleStringEntry();
		} else {
			if (new Address(this.addressCtrl.value).checkAddress()) {
				this.address = this.addressCtrl.value;
				this.changedAddress.emit(this.address);
				this.addressCtrl = new FormControl(this.address);
			} else {
				this.changedAddress.emit(null);
			}
		}
	}

	handleStringEntry(): void {
		this.nominatimService.get(this.addressCtrl.value).subscribe(data => {
			this.nominatimAddress = new Address(data);
			if (!this.nominatimAddress.checkAddress()) {
				this.controlAddress().subscribe(result => {
					this.nominatimAddress = new Address(result);
					this.addMissingInformation();
				});
			} else {
				this.addMissingInformation();
			}
		});
	}

	addMissingInformation(): void {
		if (!this.findExistingAddress(this.nominatimAddress)) {
			this.suburbDialog().subscribe(response => {
				this.address = response.address;
				this.addressCtrl = new FormControl(this.address);
				this.changedAddress.emit(this.address);
			});
		}
	}

	findExistingAddress(address: Address): boolean {
		for (const currAddress of this.addresses) {
			if (currAddress.compareTo(address)) {
				this.address = currAddress;
				return true;
			}
		}
		return false;
	}

	controlAddress(): Observable<any> {
		const dialogRef = this.controlAddressDialog.open(AddressFormComponent, {
			disableClose: true,
			width: '80%',
			data: {
				name: '',
				message: 'Sie können die eingegebene Addresse hier ändern:',
				address: this.nominatimAddress
			}
		});

		return dialogRef.afterClosed();
	}

	suburbDialog(): Observable<any> {
		const dialogRef = this.suburbSelectDialog.open(SuburbSelectionComponent, {
			disableClose: true,
			width: '250px',
			data: {
				name: '',
				message: 'Sie haben eien neue Adresse eingegeben. Bitte geben Sie den entsprechenden Stadtteil ein.'
					+ this.nominatimAddress.toString,
				address: this.nominatimAddress
			}
		});

		return dialogRef.afterClosed();
	}

}
