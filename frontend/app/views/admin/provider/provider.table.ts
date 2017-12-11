import { Component, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Location } from '@angular/common';

import { DataServiceFactory } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { AbstractTableComponent } from 'app/views/admin/table.abstract';
import { AuthenticationService } from 'app/services/authentication.service';
import { ProviderService } from 'app/services/provider.service';
import { Provider } from 'app/models/provider';
import { Constants } from 'app/services/constants';
import { User } from 'app/models/user';

@Component({
	selector: 'provider-table',
	styleUrls: ['../table.abstract.css'],
	templateUrl: 'provider.table.html',
	providers: [ProviderService]
})
export class ProviderTableComponent extends AbstractTableComponent {

	@Input() organisationID: string;

	displayedColumns: Array<string> = ['username', 'fullname', 'phone', 'admin', 'approved', 'delete'];
	dataSource: MatTableDataSource<Provider> = new MatTableDataSource<Provider>();

	constructor(
		protected dataService: ProviderService,
		protected constants: Constants,
		private location: Location) {
		super(dataService, constants);
	}

	fetchData(): void {
		if (this.organisationID) {
			this.dataService
				.getByOrganisation(this.tableState, this.organisationID)
				.subscribe(data => this.handleResponse(data));
		}
	}

	save(): void {
		const list = [];
		for (const provider of this.dataSource.data) {
			this.prepareAdminFlag(provider);
			list.push(this.dataService.edit(provider));
		}
		forkJoin(list).subscribe(() => this.back());
	}

	prepareAdminFlag(provider: Provider): void {
		if (!provider.approved && provider.admin) {
			provider.admin = false;
		}
	}

	back(): void {
		this.location.back();
	}

}
