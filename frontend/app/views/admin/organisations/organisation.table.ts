import { Component, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSidenav } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { DataSource } from '@angular/cdk/table';

import { DataServiceFactory, OrganisationService } from 'app/services/data.service.factory';
import { Organisation } from 'app/models/organisation';
import { DataService } from 'app/services/data.service';
import { AbstractTableComponent } from 'app/views/admin/table.abstract';
import { AuthenticationService } from 'app/services/authentication.service';
import { Constants } from 'app/services/constants';

@Component({
	selector: 'edit-organisation',
	styleUrls: ['../table.abstract.css'],
	templateUrl: 'organisation.table.html'
})

export class OrganisationsTableComponent extends AbstractTableComponent {

	@ViewChild('sidenav')
	sidenav: MatSidenav;
	currentDetail: Organisation;

	dataSource: MatTableDataSource<Organisation> = new MatTableDataSource<Organisation>();

	constructor(
		@Inject(OrganisationService) protected dataService: DataService,
		protected constants: Constants,
		private authService: AuthenticationService) {
		super(dataService, constants);
	}

	initColumns(): void {
		this.displayedColumns = ['Organisations.name', 'mail', 'phone', 'website', 'address'];
		if (this.actionsVisible()) {
			this.displayedColumns.push('action');
		}
	}

	actionsVisible(): boolean {
		return this.authService.isSuperUser();
	}

	showDetails(row: any): void {
		if (this.currentDetail && row.id === this.currentDetail.id) {
			this.sidenav.close();
		} else {
			this.currentDetail = new Organisation(row);
			this.sidenav.open();
		}
	}

	closeDetails(): void {
		this.currentDetail = null;
		this.sidenav.close();
	}

	generateWebSite(url: string): string {
		if (!url) {
			return '';
		}
		if (url.includes('http')) {
			return url;
		}
		return 'http://' + url;
	}

}
