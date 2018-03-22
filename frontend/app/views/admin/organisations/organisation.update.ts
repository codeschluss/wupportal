import { Component, Inject, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { NgForm, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import {
	DataServiceFactory,
	OrganisationService,
	AddressService
} from 'app/services/data.service.factory';
import { ValidationService } from 'app/services/validation.service';
import { DataService } from 'app/services/data.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { AddressAutocompleteComponent } from 'app/views/admin/addresses/address.autocomplete';
import { UserTableComponent } from 'app/views/admin/users/user.table';

import { Organisation } from 'app/models/organisation';
import { Address } from 'app/models/address';
import { Constants } from 'app/services/constants';
import { ProviderTableComponent } from 'app/views/admin/provider/provider.table';
import { ProviderService } from 'app/services/provider.service';
import { Provider } from 'app/models/provider';

@Component({
	selector: 'organisation-update',
	templateUrl: 'organisation.update.html',
	styleUrls: ['../../../app.component.css']
})

export class OrganisationUpdateComponent {

	@Input() organisation: Organisation;
	@ViewChild('addressAutocompleteComponent') addressAutocomplete: AddressAutocompleteComponent;

	constructor(
		@Inject(OrganisationService) private organisationService: DataService,
		@Inject(AddressService) private addressService: DataService,
		private location: Location,
		public constants: Constants,
		public validation: ValidationService,
	) {
	}

	addressSubmit(): void {
		const addressObservable = this.addressAutocomplete.getAddress();
		if (addressObservable) {
			addressObservable.subscribe(address => {
				this.organisation.address = new Address(address);
				this.organisation.address_id = address.id;
			});
		}
	}

	resetAddress(): void {
		this.organisation.address = new Address();
	}

	onSubmit(): void {
		this.organisation.address = null;
		this.organisationService
			.edit(this.organisation)
			.subscribe(() => this.back());
	}

	back(): void {
		this.location.back();
	}

}
