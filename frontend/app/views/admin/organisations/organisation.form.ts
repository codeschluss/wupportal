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
	selector: 'organisation-form',
	templateUrl: 'organisation.form.html',
	styleUrls: ['../../../app.component.css'],
	providers: [
		{ provide: OrganisationService, useFactory: DataServiceFactory(OrganisationService), deps: [HttpClient, AuthenticationService] },
		{ provide: AddressService, useFactory: DataServiceFactory(AddressService), deps: [HttpClient, AuthenticationService] }
	]
})

export class OrganisationFormComponent implements OnInit {

	@Input() organisation: Organisation;
	@ViewChild('addressAutocompleteComponent') addressAutocomplete: AddressAutocompleteComponent;
	@ViewChild('userTableComponent') usersTable: UserTableComponent;

	stepperFormGroup: FormGroup;
	adminProviders: Array<Provider> = new Array<Provider>();

	constructor(
		@Inject(OrganisationService) private organisationService: DataService,
		@Inject(AddressService) private addressService: DataService,
		private providerService: ProviderService,
		private location: Location,
		public route: ActivatedRoute,
		public constants: Constants,
		public validation: ValidationService,
		private _formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) => {
				if (params.get('id') === 'new') {
					return new Observable(observer => observer.next(new Organisation({})));
				} else {
					return this.organisationService.get(params.get('id'));
				}
			}).map(data => new Organisation(data.records)).
			subscribe(organisation => this.organisation = organisation);

		this.stepperFormGroup = this._formBuilder.group({
			stepCtrl: ['', Validators.required]
		});
	}

	addressChanged(event: any): void {
		if (event.id) {
			this.organisation.address_id = event.id;
		}
		this.organisation.address = event;
	}

	addressSubmit(): void {
		this.addressAutocomplete.onSubmit();
	}

	prepareSubmit(): void {
		if (!this.organisation.address.id) {
			this.organisation.address.suburb = null;
			this.addressService.add(this.organisation.address).subscribe(
				response => {
					this.organisation.address = response.records;
					this.organisation.address.suburb = response.records.suburb;
					this.organisation.address_id = response.records.id;
				});
		}
	}

	approvedAsAdmin(event: any): void {
		const provider = new Provider();
		provider.approved = true;
		provider.admin = true;
		provider.user_id = event;
		this.adminProviders.push(provider);
	}

	removedAsAdmin(event: any): void {
		const index = this.adminProviders.indexOf(
			this.adminProviders.find(provider => provider.user_id === event)
		);
		this.adminProviders.splice(index, 1);
	}

	onSubmit(): void {
		this.organisation.address = null;
		if (this.organisation.id) {
			this.organisationService.edit(this.organisation).subscribe(() => this.back());
		} else {
			this.organisationService.add(this.organisation).subscribe(orga =>
				this.combineProviderSubsribtions(orga.records).subscribe(() => this.back())
			);
		}
	}

	combineProviderSubsribtions(orga: Organisation): Observable<any[]> {
		const observableProviderArray: Observable<any>[] = [];
		for (const provider of this.adminProviders) {
			provider.organisation_id = orga.id;
			observableProviderArray.push(this.providerService.add(provider));
		}
		return Observable.forkJoin(observableProviderArray);
	}

	back(): void {
		this.location.back();
	}

}
