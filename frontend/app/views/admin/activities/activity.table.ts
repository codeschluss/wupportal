import { Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { DataSource } from '@angular/cdk/table';

import { DataServiceFactory, ActivityService } from 'app/services/data.service.factory';
import { Activity } from 'app/models/activity';
import { DataService } from 'app/services/data.service';
import { Constants } from 'app/views/common/constants';
import { AbstractTableComponent } from 'app/views/admin/table.abstract';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
	selector: 'edit-activity',
	styleUrls: ['../table.abstract.css'],
	templateUrl: 'activity.table.html',
	providers: [
		{ provide: ActivityService, useFactory: DataServiceFactory(ActivityService), deps: [HttpClient, AuthenticationService] }
	]
})

export class ActivityTableComponent extends AbstractTableComponent {

	displayedColumns: Array<string> = ['name', 'description', 'schedule', 'provider', 'tags', 'target_groups', 'action'];
	dataSource: MatTableDataSource<Activity> = new MatTableDataSource<Activity>();

	constructor(
		@Inject(ActivityService) protected dataService: DataService,
		protected constants: Constants,
		protected deleteDialog: MatDialog) {
		super(dataService, constants, deleteDialog);
	}
}
