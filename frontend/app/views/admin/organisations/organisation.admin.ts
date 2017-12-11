import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';

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
import { OrganisationSelectionComponent } from 'app/views/admin/dialog/organisation-selection.dialog';

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
		public constants: Constants,
		public selectOrgaDialog: MatDialog,
		public location: Location
	) { }

	ngOnInit(): void {
		const adminOrganisations: Array<Organisation> = this.authService.currentUser.getAdminOrgas();
		adminOrganisations.length > 1
			? this.selectOrganisation(adminOrganisations)
			: this.setOrganisation(adminOrganisations.shift().id);
	}

	setOrganisation(organisationID: string): void {
		this.organisationService.get(organisationID)
			.map(data => new Organisation(data.records))
			.subscribe((organisation) => {
				this.organisation = organisation;
			});
	}

	selectOrganisation(organisations: Array<Organisation>): void {
		const dialogRef = this.selectOrgaDialog.open(OrganisationSelectionComponent, {
			data: {
				organisations: organisations
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			result
				? this.setOrganisation(result)
				: this.location.back();
		});
	}

	setProviders(providers: Array<Provider>): void {
		this.providerIDs = providers.map(provider => provider.id);
	}

}
