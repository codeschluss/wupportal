import { Component, Inject, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
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
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-free-solid';

@Component({
	selector: 'provider-approval-table',
	styleUrls: ['../table.abstract.css', '../../../app.component.css'],
	templateUrl: 'provider-approval.table.html'
})
export class ProviderApprovalTableComponent implements OnChanges {

	@Input() providers: Array<Provider>;
	@Output() onApproved: EventEmitter<Provider> = new EventEmitter<Provider>();

	protected displayedColumns: Array<string> = ['username', 'fullname', 'approve', 'decline'];
	dataSource: MatTableDataSource<Provider> = new MatTableDataSource<Provider>();
	faUserPlus: IconDefinition = faUserPlus;
	constructor(
		protected dataService: ProviderService,
		protected constants: Constants) {
	}

	ngOnChanges(changes: SimpleChanges): void {
		const providers: SimpleChange = changes.providers;
		this.dataSource.data = providers.currentValue;
	}

	approve(row: any): void {
		row.approved = true;
		this.dataService.edit(row).subscribe(() => this.onApproved.emit(row));
	}

	onDelete(recordID: string): void {
		this.dataService
			.delete(recordID)
			.subscribe(() => this.dataSource.data =
				this.dataSource.data.filter(provider => provider.id !== recordID));
	}
}
