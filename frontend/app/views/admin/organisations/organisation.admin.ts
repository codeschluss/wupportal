import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { HttpClient } from '@angular/common/http';

import {
	DataServiceFactory,
	OrganisationService
} from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { AuthenticationService } from 'app/services/authentication.service';

import { Organisation } from 'app/models/organisation';
import { Constants } from 'app/services/constants';
import { ProviderTableComponent } from 'app/views/admin/provider/provider.table';
import { Provider } from 'app/models/provider';

@Component({
	selector: 'organisation-admin',
	templateUrl: 'organisation.admin.html',
	styleUrls: ['../../../app.component.css'],
	providers: [
		{ provide: OrganisationService, useFactory: DataServiceFactory(OrganisationService), deps: [HttpClient, AuthenticationService] }
	]
})

export class OrganisationAdminComponent implements OnInit {

	organisation: Organisation;

	@ViewChild(ProviderTableComponent)
	providerTable: ProviderTableComponent;
	providerIDs: Array<string>;

	constructor(
		@Inject(OrganisationService) private organisationService: DataService,
		private authService: AuthenticationService,
		public constants: Constants
	) { }

	ngOnInit(): void {

		let organisationID: string;
		this.authService.currentUser.providers.forEach(provider => {
			if (provider.admin) {
				organisationID = provider.organisation_id;
			}
		});

		this.organisationService.get(organisationID)
			.map(data => new Organisation(data.records))
			.subscribe((organisation) => {
				this.organisation = organisation;
			});
	}

	setProviders(providers: Array<Provider>): void {
		this.providerIDs = providers.map(provider => provider.id);
	}

}
