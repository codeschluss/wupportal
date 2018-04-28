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
	AddressService,
	TranslationService
} from 'app/services/data.service.factory';
import { ValidationService } from 'app/services/validation.service';
import { DataService } from 'app/services/data.service';
import { AddressAutocompleteComponent } from 'app/views/admin/addresses/address.autocomplete';
import { UserTableComponent } from 'app/views/admin/users/user.table';
import { TranslatableFieldsComponent } from 'app/views/admin/translations/translatable.form';

import { Organisation } from 'app/models/organisation';
import { Address } from 'app/models/address';
import { Constants } from 'app/services/constants';
import { ProviderTableComponent } from 'app/views/admin/provider/provider.table';
import { ProviderService } from 'app/services/provider.service';
import { Provider } from 'app/models/provider';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';

@Component({
	selector: 'organisation-form',
	templateUrl: 'organisation.form.html',
	styleUrls: ['../../../app.component.css', '../admin.area.css']
})

export class OrganisationFormComponent implements OnInit {

	@Input() organisation: Organisation;
	@ViewChild('addressAutocompleteComponent') addressAutocomplete: AddressAutocompleteComponent;
	@ViewChild('userTableComponent') usersTable: UserTableComponent;

	baseDataFormGroup: FormGroup;
	addressFormGroup: FormGroup;
	adminFormGroup: FormGroup;
	faCheck: IconDefinition = faCheck;
	translations: any[] = [];
	selectedLanguage: '';
	adminProviders: Array<Provider> = new Array<Provider>();

	constructor(
		@Inject(OrganisationService) private organisationService: DataService,
		@Inject(AddressService) private addressService: DataService,
		@Inject(TranslationService) private translationService: DataService,
		private providerService: ProviderService,
		private location: Location,
		public route: ActivatedRoute,
		public constants: Constants,
		public validation: ValidationService,
		private _formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.organisation = new Organisation();
		this.baseDataFormGroup = this._formBuilder.group({
			nameCtrl: new FormControl('', [Validators.required]),
			descriptionCtrl: new FormControl(''),
			mailCtrl: new FormControl(''),
			phoneCtrl: new FormControl(''),
			webSiteCtrl: new FormControl('')
		});
		this.addressFormGroup = this._formBuilder.group({
			addressCtrl: new FormControl(this.organisation.address.isValid, [Validators.required])
		});

		this.adminFormGroup = this._formBuilder.group({
		});
		this.baseDataFormGroup.get('nameCtrl').valueChanges.subscribe(name => { this.organisation.name = name; });
		this.baseDataFormGroup.get('descriptionCtrl').valueChanges.subscribe(description => { this.organisation.description = description; });
		this.baseDataFormGroup.get('mailCtrl').valueChanges.subscribe(mail => { this.organisation.mail = mail; });
		this.baseDataFormGroup.get('phoneCtrl').valueChanges.subscribe(phone => { this.organisation.phone = phone; });
		this.baseDataFormGroup.get('webSiteCtrl').valueChanges.subscribe(website => { this.organisation.website = website; });
	}

	addressSubmit(): void {
		const addressObservable = this.addressAutocomplete.getAddress();
		if (addressObservable) {
			addressObservable.subscribe(address => {
				this.organisation.address = address;
				this.organisation.address_id = address.id;
				this.addressFormGroup.get('addressCtrl').setValue(this.organisation.address);
			});
		}
	}

	resetAddress(): void {
		this.organisation.address = new Address();
		this.addressFormGroup.get('addressCtrl').setValue('');
	}

	approvedAsAdmin(event: any): void {
		const provider = new Provider();
		provider.approved = true;
		provider.admin = true;
		provider.user_id = event.id;
		provider.user = event;
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
			this.organisationService.add(this.organisation).subscribe(orga => {
				if (this.adminProviders.length) {
					this.combineProviderSubsribtions(orga).subscribe(() => this.back());
				} else {
					this.back();
				}
			});
		}
	}

	combineProviderSubsribtions(orga: Organisation): Observable<any[]> {
		const observableProviderArray: Observable<any>[] = [];
		for (const provider of this.adminProviders) {
			provider.organisation_id = orga.id;
			provider.user = null;
			observableProviderArray.push(this.providerService.add(provider));
		}
		return Observable.forkJoin(observableProviderArray);
	}

	back(): void {
		this.location.back();
	}

}
