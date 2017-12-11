import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { DataSource } from '@angular/cdk/table';

import { DataServiceFactory } from 'app/services/data.service.factory';
import { ActivityService } from 'app/services/activity.service';
import { Activity } from 'app/models/activity';
import { Schedule } from 'app/models/schedule';
import { DataService } from 'app/services/data.service';
import { AbstractTableComponent } from 'app/views/admin/table.abstract';
import { AuthenticationService } from 'app/services/authentication.service';
import { Constants } from 'app/services/constants';

@Component({
	selector: 'activity-table',
	styleUrls: ['../table.abstract.css'],
	templateUrl: 'activity.table.html',
	providers: [ActivityService]
})

export class ActivityTableComponent extends AbstractTableComponent implements OnInit {

	@Input() providers: Array<string> = [];

	displayedColumns: Array<string> = ['name', 'category', 'description', 'provider', 'tags', 'target_groups', 'schedule'];
	dataSource: MatTableDataSource<Activity> = new MatTableDataSource<Activity>();

	constructor(
		protected authService: AuthenticationService,
		protected dataService: ActivityService,
		protected constants: Constants) {
		super(dataService, constants);
	}

	fetchData(): void {
		this.providers.length !== 0
			? this.dataService.getByProviders(this.tableState, this.providers)
				.subscribe(data => this.handleResponse(data))
			: this.dataService.list(this.tableState)
				.subscribe(data => this.handleResponse(data));
	}

	toString(json: any): string {
		if (json) {
			return new Schedule(json).toString;
		}
	}
}
