import { Component, Inject, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataService } from 'app/services/data.service';
import { AuthenticationService } from 'app/services/authentication.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationService } from 'app/services/validation.service';

import {
	DataServiceFactory,
	AddressService,
	SuburbService
} from 'app/services/data.service.factory';

import { Address } from 'app/models/address';
import { Constants } from 'app/services/constants';
import { Suburb } from '../../../models/suburb';


@Component({
	templateUrl: 'address.form.html'
})

export class AddressFormComponent implements OnInit {

	address: Address;
	suburbs: Suburb[];

	constructor(
		private location: Location,
		public constants: Constants,
		public validation: ValidationService,
		public route: ActivatedRoute,
		@Inject(AddressService) private addressService: DataService,
		@Inject(SuburbService) private suburbService: DataService,
	) {
	}

	ngOnInit(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) => {
				return this.addressService.get(params.get('id'));
			}).subscribe(address => this.address = new Address(address));
		this.suburbService.getAll().subscribe((response) => this.suburbs = response);
	}

	resetSuburb(): void {
		this.address.suburb = null;
	}

	onSubmit(): void {
		this.addressService.edit(this.address).subscribe(() => this.back());
	}

	back(): void {
		this.location.back();
	}


}


