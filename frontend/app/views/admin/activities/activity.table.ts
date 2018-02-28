import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSidenav } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { DataSource } from '@angular/cdk/table';

import { DataServiceFactory } from 'app/services/data.service.factory';
import { ActivityService } from 'app/services/activity.service';
import { ProviderService } from 'app/services/provider.service';
import { Activity } from 'app/models/activity';
import { Schedule } from 'app/models/schedule';
import { DataService } from 'app/services/data.service';
import { AbstractTableComponent } from 'app/views/admin/table.abstract';
import { AuthenticationService } from 'app/services/authentication.service';
import { Constants } from 'app/services/constants';
import * as moment from 'moment';

@Component({
	selector: 'activity-table',
	styleUrls: ['../table.abstract.css'],
	templateUrl: 'activity.table.html',
	providers: [
		ProviderService, ActivityService]
})

export class ActivityTableComponent extends AbstractTableComponent implements OnInit {

	@Input() providers: Array<string> = [];
	@Input() showActions: boolean = false;

	@ViewChild('sidenav')
	sidenav: MatSidenav;

	currentDetail: Activity;
	showNewButton: boolean = false;
	dataSource: MatTableDataSource<Activity> = new MatTableDataSource<Activity>();

	constructor(
		protected authService: AuthenticationService,
		protected dataService: ActivityService,
		private providerService: ProviderService,
		protected constants: Constants) {
		super(dataService, constants);
		this.checkNewButton();
	}

	checkNewButton(): void {
		if (this.actionsVisible()) {
			this.showNewButton = true;
		} else {
			let tmpProvs = 0;
			this.providerService
				.getByUser(this.authService.currentUser.id)
				.map(data => data.records)
				.subscribe(providers => providers.map(provider => {
					if (provider.approved || this.showNewButton) { tmpProvs++; this.showNewButton = true; }
				}));
		}
	}

	initColumns(): void {
		this.displayedColumns = [
			'Activities.name',
			'Categories.name',
			'Activities.description',
			'Organisations.name',
			// 'schedules',
			'tags',
			'target_groups'
		];

		if (this.actionsVisible()) {
			this.displayedColumns.push('action');
		}
	}

	actionsVisible(): boolean {
		return this.showActions || this.authService.isSuperUser();
	}

	fetchData(): void {
		console.log('providers', this.providers);
		this.providers.length !== 0
			? this.dataService.getByProviders(this.tableState, this.providers)
				.subscribe(data => this.handleResponse(data))
			: this.dataService.list(this.tableState)
				.subscribe(data => this.handleResponse(data));
	}

	// only showing dates in the future
	toString(schdules: Schedule[]): string {
		if (schdules) {
			for (const schedule of schdules) {
				const currDate = moment(schedule.start_date);
				if (currDate.isAfter(moment())) {
					return new Schedule(schedule).toString;
				}
			}
		}
		return this.constants.noFutureDates;
	}

	showDetails(row: any): void {
		if (this.currentDetail && row.id === this.currentDetail.id) {
			this.sidenav.close();
		} else {
			this.currentDetail = new Activity(row);
			this.sidenav.open();
		}
	}

	closeDetails(): void {
		this.currentDetail = null;
		this.sidenav.close();
	}
}
