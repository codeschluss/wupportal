import { Component, Inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/Rx';

import { DataServiceFactory, OrganisationService, UserService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { ValidationService } from 'app/services/validation.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ProviderService } from 'app/services/provider.service';
import { Constants } from 'app/services/constants';

import { User } from 'app/models/user';
import { Organisation } from 'app/models/organisation';
import { Provider } from 'app/models/provider';
import { MatTableDataSource } from '@angular/material';

@Component({
	selector: 'provider-request',
	templateUrl: 'provider-request.table.html'
})

export class ProviderRequestTableComponent implements OnInit {

	@Input() private user: User;

	private selectedOrganisations: Array<string>;
	private organisationOptions: Array<Organisation>;
	private organisationsCtrl: FormControl;

	private displayedColumns: Array<string> = ['name', 'website', 'mail', 'phone', 'approved'];
	private dataSource: MatTableDataSource<Provider> = new MatTableDataSource<Provider>();

	private providersToAdd: Array<Provider>;
	private providersToDelete: Array<string>;

	constructor(
		@Inject(OrganisationService) public organisationService: DataService,
		public providerService: ProviderService,
		public constants: Constants,
		public location: Location,
		public authService: AuthenticationService
	) { }

	ngOnInit(): void {
		this.setInitialSelections();
		this.setOrganisationOptions();
	}

	setInitialSelections(): void {
		this.organisationsCtrl = this.user.providers
			? new FormControl(this.user.providers
				.map(provider => provider.organisation.id))
			: new FormControl();

		this.organisationsCtrl.valueChanges.subscribe(value => this.setData(value));
	}

	setOrganisationOptions(): void {
		this.organisationService.getAll()
			.map(value => value as Array<Organisation>)
			.subscribe(orgas => {
				this.organisationOptions = orgas;
				this.setData(this.user.providers
					.map(provider => provider.organisation.id));
			});
	}

	setData(selectedOrgaIDs: Array<string>): void {
		console.log('value', selectedOrgaIDs);
		this.setCurrentProviders(selectedOrgaIDs);
		this.setDeletedProviders(selectedOrgaIDs);
	}

	setCurrentProviders(selectedOrgaIDs: Array<string>): void {
		const providers: Array<Provider> = new Array<Provider>();
		this.providersToAdd = new Array<Provider>();

		selectedOrgaIDs.forEach(orgaID => {
			let found: boolean = false;
			for (const provider of this.user.providers) {
				if (provider.organisation_id === orgaID) {
					providers.push(provider);
					found = true;
					break;
				}
			}
			if (!found) {
				const newProvider: Provider = new Provider();
				newProvider.user_id = this.user.id;
				newProvider.organisation_id = orgaID;
				newProvider.organisation = this.findOrganisation(orgaID);
				providers.push(newProvider);
				this.providersToAdd.push(newProvider);
			}
		});

		this.dataSource.data = providers;
	}

	findOrganisation(orgaID: string): Organisation {
		for (const orga of this.organisationOptions) {
			if (orga.id === orgaID) {
				return orga;
			}
		}
	}

	setDeletedProviders(selectedOrgaIDs: Array<string>): void {
		this.providersToDelete = new Array<string>();
		if (this.user.providers) {
			this.user.providers.forEach(provider => {
				const deleted = !this.organisationsCtrl.value.includes(provider.organisation_id);
				if (deleted) {
					this.providersToDelete.push(provider.id);
				}
			});
		}
	}

	onSubmit(): void {
		let requests = [];
		requests = requests.concat(this.deleteProviders(), this.addProvider());
		forkJoin(requests).subscribe(() => this.updateUser());
	}

	deleteProviders(): Array<any> {
		return this.providersToDelete.map(providerID =>
			this.providerService.delete(providerID)
		);
	}

	addProvider(): Array<any> {
		return this.providersToAdd.map(provider => {
			const saveProvider = new Provider();
			saveProvider.organisation_id = provider.organisation_id;
			saveProvider.user_id = provider.user_id;
			return this.providerService.add(saveProvider);
		});
	}

	updateUser(): void {
		this.authService.login(this.user.username, this.user.password)
			.subscribe(
				null,
				error => this.authService.redirectToLogin()
			);
	}
}
