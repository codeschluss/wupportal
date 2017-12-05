import { Component, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/models/user';
import { MatTableDataSource, MatDialog } from '@angular/material';

import { DataServiceFactory } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { AbstractTableComponent } from 'app/views/admin/table.abstract';
import { AuthenticationService } from 'app/services/authentication.service';
import { ProviderService } from 'app/services/provider.service';
import { Provider } from 'app/models/provider';
import { Constants } from 'app/services/constants';

@Component({
	selector: 'provider-table',
	styleUrls: ['../table.abstract.css'],
	templateUrl: 'provider.table.html',
	providers: [ProviderService]
})
export class ProviderTableComponent extends AbstractTableComponent {

	@Input() organisationID: string;

	displayedColumns: Array<string> = ['username', 'fullname', 'phone', 'admin', 'delete'];
	dataSource: MatTableDataSource<Provider> = new MatTableDataSource<Provider>();

	constructor(
		protected dataService: ProviderService,
		protected constants: Constants) {
		super(dataService, constants);
	}

	fetchData(): void {
		if (this.organisationID) {
			this.dataService
				.getByOrganisation(this.tableState, this.organisationID)
				.subscribe(data => this.handleResponse(data));
		}
	}
}
