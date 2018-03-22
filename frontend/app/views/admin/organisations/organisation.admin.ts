import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';

import {
	DataServiceFactory,
	OrganisationService
} from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ProviderService } from 'app/services/provider.service';

import { Organisation } from 'app/models/organisation';
import { Constants } from 'app/services/constants';
import { ProviderTableComponent } from 'app/views/admin/provider/provider.table';
import { Provider } from 'app/models/provider';
import { OrganisationSelectionComponent } from 'app/views/admin/dialog/organisation-selection.dialog';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'organisation-admin',
	templateUrl: 'organisation.admin.html',
	styleUrls: ['../../../app.component.css']
})

export class OrganisationAdminComponent implements OnInit {

	organisation: Organisation;
	organisationProviders: Array<Provider>;
	notApprovedProviders: Array<Provider>;
	approvedProviders: Array<Provider>;

	showRequests: boolean = false;

	@ViewChild(ProviderTableComponent)
	providerTable: ProviderTableComponent;

	constructor(
		@Inject(OrganisationService) private organisationService: DataService,
		private providerService: ProviderService,
		private authService: AuthenticationService,
		public constants: Constants,
		public selectOrgaDialog: MatDialog,
		public location: Location,
		public route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.route.paramMap
			.forEach((params: ParamMap) =>
				params.get('id') === 'from-nav'
					? this.handleFromNavigation()
					: this.setOrganisationAndProviders(params.get('id'))
			);
	}

	handleFromNavigation(): void {
		this.authService.isSuperUser()
			? this.organisationService
				.getAll()
				.subscribe(organisations => {
					this.handleRequestedOrganisations(organisations);
				})
			: this.providerService
				.getByUser(this.authService.currentUser.id, true)
				.map(data => data.map(provider => provider.organisation))
				.subscribe(adminOrganisations => {
					this.handleRequestedOrganisations(adminOrganisations);
				});
	}

	handleRequestedOrganisations(organisations: Array<Organisation>): void {
		organisations.length > 1
			? this.selectOrganisation(organisations)
			: this.setOrganisationAndProviders(organisations.shift().id);
	}

	selectOrganisation(organisations: Array<Organisation>): void {
		const dialogRef = this.selectOrgaDialog.open(OrganisationSelectionComponent, {
			data: {
				organisations: organisations
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			result
				? this.setOrganisationAndProviders(result)
				: this.location.back();
		});
	}

	setOrganisationAndProviders(organisationID: string): void {
		this.getOrganisation(organisationID)
			.subscribe(organisation => {
				this.organisation = new Organisation(organisation);
				this.setProviders();
			});
	}

	getOrganisation(organisationID: string): Observable<Organisation> {
		return this.organisationService.get(organisationID)
			.map(data => new Organisation(data));
	}

	setProviders(): void {
		this.providerService
			.getByOrganisation(this.organisation.id)
			.map(data => data as Array<Provider>)
			.subscribe(providers => {
				this.organisationProviders = providers;
				this.setDataForProviderTables();
				this.switch();
			});
	}

	setDataForProviderTables(): void {
		this.notApprovedProviders = [];
		this.approvedProviders = [];
		this.organisationProviders
			.forEach(provider => {
				provider.approved
					? this.approvedProviders.push(provider)
					: this.notApprovedProviders.push(provider);
			});
	}

	switch(): void {
		this.showRequests = !this.showRequests;
	}

	switchButtonLabel(): string {
		return this.showRequests
			? this.constants.showMembers
			: this.constants.showRequests;
	}

	onApproved(): void {
		this.setProviders();
	}

	getProviderIDs(): Array<string> {
		return this.organisationProviders
			.map(provider => provider.id);
	}
}
