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
import { AddressCreateFormComponent } from 'app/views/admin/addresses/address.create.form';
import { Constants } from 'app/services/constants';
import { SuburbSelectionComponent } from 'app/views/admin/dialog/popup.suburb.selection';
import { Object } from 'openlayers';
import { Subscription } from 'rxjs/Subscription';
import { generate } from 'rxjs/observable/generate';


@Component({
	selector: 'address-autocomplete-form',
	templateUrl: 'address.autocomplete.html',
	styleUrls: ['../../../app.component.css']
})

/*
	TODO: Processing is not save! Needs check and let observer give null values
*/
export class AddressAutocompleteComponent implements OnInit {

	@Input() initialAddress: Address;

	addressCtrl: FormControl;
	addresses: Address[] = [];
	filteredAddresses: Observable<Address[]>;
	observer: any;

	constructor(
		@Inject(AddressService) private addressService: DataService,
		public constants: Constants,
		private suburbSelectDialog: MatDialog,
		private controlAddressDialog: MatDialog,
		private nominatimService: NominatimService,
		public authService: AuthenticationService
	) {
		this.addressService.getAll()
			.map(response => response.map(addressJson => new Address(addressJson)))
			.subscribe(addresses => {
				this.addresses = addresses;
			});
	}

	ngOnInit(): void {
		this.addressCtrl = new FormControl(this.initialAddress);
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

	getAddress(): Observable<any> {
		const addressValue: any = this.addressCtrl.value;
		if ((addressValue instanceof Address && addressValue.isValid) ||
			(typeof addressValue === 'string' && addressValue.length >= 5)) {
			return Observable.create(observer => {
				this.observer = observer;
				typeof addressValue === 'string'
					? this.handleStringValue(addressValue)
					: this.handleObjectValue(addressValue);
			});
		}
	}

	handleObjectValue(addressObj: any): void {
		addressObj.isValid
			? this.observer.next(this.addressCtrl.value)
			: this.observer.next(null);
	}

	handleStringValue(addressString: string): void {
		addressString
			? this.nominatimService.get(this.addressCtrl.value).subscribe(data => {
				const nominatimAddress: Address = new Address(data);
				nominatimAddress.isValid
					? this.handleNominatimResponse(nominatimAddress)
					: this.handleAddressCreation(nominatimAddress);
			})
			: this.observer.next(null);
	}

	handleNominatimResponse(nominatimAddress: Address): void {
		const existingAddress: Address = this.alreadyExits(nominatimAddress);
		existingAddress
			? this.observer.next(existingAddress)
			: this.setAddress(nominatimAddress);
	}

	alreadyExits(address: Address): Address {
		for (const currAddress of this.addresses) {
			if (currAddress.compareTo(address)) {
				return currAddress;
			}
		}
		return null;
	}

	handleAddressCreation(address: Address): void {
		this.createAddress(address).subscribe(addressResponse => {
			const responseAddress = new Address(addressResponse);
			if (responseAddress.isValid) { this.setAddress(responseAddress); }
		});
	}

	setAddress(address: Address): void {
		this.getSuburb(address).subscribe(suburb => {
			address.suburb_id = suburb.id;
			address.suburb = null;
			this.saveAddress(address);
		});
	}

	saveAddress(address: Address): void {
		this.addressService.add(address)
			.map(response => new Address(response))
			.subscribe(savedAddress => {
				this.observer.next(savedAddress);
			});
	}

	createAddress(address: Address): Observable<any> {
		const dialogRef = this.controlAddressDialog.open(AddressCreateFormComponent, {
			disableClose: true,
			width: '80%',
			data: {
				message: 'Sie können die eingegebene Addresse hier ändern:',
				address: address,
			}
		});
		return dialogRef.afterClosed();
	}

	getSuburb(address: Address): Observable<any> {
		const dialogRef = this.suburbSelectDialog.open(SuburbSelectionComponent, {
			disableClose: true,
			width: '250px',
			data: {
				message: 'Sie haben eine neue Adresse eingegeben. Bitte geben Sie den entsprechenden Stadtteil ein.'
					+ address.toString,
				address: address
			}
		});
		return dialogRef.afterClosed();
	}

}
