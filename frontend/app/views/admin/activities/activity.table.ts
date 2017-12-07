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

	displayedColumns: Array<string> = ['name', 'description', 'provider', 'tags', 'target_groups', 'action'];
	dataSource: MatTableDataSource<Activity> = new MatTableDataSource<Activity>();

	constructor(
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

	// has to be removed
	toString(json: any): string {
		if (json) {
			const schedule = new Schedule(json);
			if (schedule.recurrence) {
				return schedule.recurrence.week_days + ' ' + schedule.start_date.toLocaleTimeString(['de-AT'], { hour: '2-digit', minute: '2-digit' });
			} else {
				return schedule.start_date.getDate + ' ' + schedule.startTime;
			}
		} else {
			return '';
		}
	}
}
