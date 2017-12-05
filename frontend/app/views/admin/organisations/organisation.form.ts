import { Component, Inject, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { NgForm, FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { forkJoin } from 'rxjs/observable/forkJoin';

import {
	DataServiceFactory,
	OrganisationService,
	AddressService,
	SuburbService
} from 'app/services/data.service.factory';
import { ValidationService } from 'app/services/validation.service';
import { DataService } from 'app/services/data.service';
import { NominatimService } from 'app/services/nominatim';
import { AddressFormComponent } from 'app/views/admin/addresses/address.form';
import { AuthenticationService } from 'app/services/authentication.service';

import { Organisation } from 'app/models/organisation';
import { Address } from 'app/models/address';
import { Constants } from 'app/services/constants';
import { SuburbSelectionComponent } from 'app/views/admin/dialog/popup.suburb.selection';
import { ProviderTableComponent } from 'app/views/admin/provider/provider.table';
import { ProviderService } from 'app/services/provider.service';

@Component({
	selector: 'edit-organisation',
	templateUrl: 'organisation.form.html',
	styleUrls: ['../../../app.component.css'],
	providers: [
		{ provide: OrganisationService, useFactory: DataServiceFactory(OrganisationService), deps: [HttpClient, AuthenticationService] },
		{ provide: AddressService, useFactory: DataServiceFactory(AddressService), deps: [HttpClient, AuthenticationService] }
	]
})

export class OrganisationFormComponent implements OnInit {
	organisation: Organisation;
	addresses: Address[] = [];
	filteredAddresses: Observable<Address[]>;
	addressCtrl: FormControl;
	nominatimAddress: Address;

	@ViewChild(ProviderTableComponent)
	providerTable: ProviderTableComponent;

	constructor(
		@Inject(OrganisationService) private organisationService: DataService,
		@Inject(AddressService) private addressService: DataService,
		private providerService: ProviderService,
		private location: Location,
		public route: ActivatedRoute,
		public constants: Constants,
		private suburbSelectDialog: MatDialog,
		private controlAddressDialog: MatDialog,
		private nominatimService: NominatimService,
		public validation: ValidationService
	) {
		this.addressService.getAll().subscribe((data) => {
			for (const add of data.records) {
				this.addresses.push(new Address(add));
			}
		});
	}

	ngOnInit(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) =>
				this.organisationService.get(params.get('id'))).map(data => new Organisation(data.records)).subscribe((organisation) => {
					this.organisation = organisation;
					this.addressCtrl = new FormControl(this.organisation.address);
					this.filteredAddresses = this.addressCtrl.valueChanges
						.startWith(<any>[])
						.map(address => address && typeof address === 'object' ? new Address(address).toString : address)
						.map(address => address ? this.filterAddresses(address) : this.addresses.slice());
				});
	}

	filterAddresses(query: string): Address[] {
		console.log('filter: ' + query);
		return this.addresses.filter(address =>
			address.toString.toLocaleLowerCase().indexOf(query.toLowerCase()) !== -1);
	}

	toString(address: any): string {
		if (typeof address === 'string') {
			return address;
		}
		if (typeof address === 'object') {
			return new Address(address).toString;
		}
	}

	// compareAddresses(address1: Address, address2: Address): boolean {
	// 	if (address1.street.toLocaleLowerCase().localeCompare(address2.street.toLocaleLowerCase()) === 0 &&
	// 		address1.house_number.toLocaleLowerCase().localeCompare(address2.house_number.toLocaleLowerCase()) === 0 &&
	// 		address1.postal_code.toLocaleLowerCase().localeCompare(address2.postal_code.toLocaleLowerCase()) === 0 &&
	// 		address1.place.toLocaleLowerCase().localeCompare(address2.place.toLocaleLowerCase()) === 0
	// 	) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

	// checkAddress(address: Address): boolean {
	// 	if (address.house_number &&
	// 		address.place &&
	// 		address.postal_code &&
	// 		address.street) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

	onSubmit(): void {
		if (typeof this.addressCtrl.value === 'string') {
			this.nominatimService.get(this.addressCtrl.value).subscribe((data) => {
				this.nominatimAddress = new Address(data);
				if (!this.nominatimAddress.checkAddress) {
					this.controlAddress(this.nominatimAddress).subscribe(result => {
						this.nominatimAddress = new Address(result);
						if (this.findExistingAddress(this.nominatimAddress)) {
							this.back();
							return;
						}
						this.organisation.address = null;
						this.openDialog(this.nominatimAddress);
					});
				} else {
					if (this.findExistingAddress(this.nominatimAddress)) {
						this.back();
						return;
					}
					this.organisation.address = null;
					this.openDialog(this.nominatimAddress);
				}
			});
		} else {
			if (this.addressCtrl.value.id) {
				if (this.addressCtrl.value.id !== this.organisation.address_id) {
					this.organisation.address_id = this.addressCtrl.value.id;
				}
			}
			this.providerRequest()
				.subscribe(() => this.organisationService
					.edit(this.organisation)
					.subscribe(() => this.back())
				);
		}
	}

	findExistingAddress(address: Address): boolean {
		for (const currAddress of this.addresses) {
			if (currAddress.compareTo(this.nominatimAddress)) {
				this.organisation.address_id = currAddress.id;
				this.organisationService.edit(this.organisation);
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

	providerRequest(): Observable<any> {
		const list = [];
		for (const provider of this.providerTable.getData()) {
			list.push(this.providerService.edit(provider));
		}
		return forkJoin(list);
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
				this.organisation.address_id = response.records.id;
				this.organisationService.edit(this.organisation);
				this.back();
			});
		});
	}

	back(): void {
		this.location.back();
	}

}
