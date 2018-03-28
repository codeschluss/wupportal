import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSidenav } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { DataSource } from '@angular/cdk/table';

import { DataServiceFactory, UserService } from 'app/services/data.service.factory';
import { ActivityService } from 'app/services/activity.service';
import { ProviderService } from 'app/services/provider.service';
import { Activity } from 'app/models/activity';
import { User } from 'app/models/user';
import { Schedule } from 'app/models/schedule';
import { DataService } from 'app/services/data.service';
import { AbstractTableComponent } from 'app/views/admin/table.abstract';
import { AuthenticationService } from 'app/services/authentication.service';
import { Constants } from 'app/services/constants';
import { Provider } from 'app/models/provider';

import * as moment from 'moment';

@Component({
	selector: 'activity-table',
	styleUrls: ['../table.abstract.css'],
	templateUrl: 'activity.table.html'
})

export class ActivityTableComponent extends AbstractTableComponent implements OnInit {

	@Input() providers: Array<string> = [];
	@Input() showActions: boolean = false;

	@ViewChild('sidenav')
	sidenav: MatSidenav;

	currentDetail: Activity;
	currentUser: User;
	showNewButton: boolean = false;
	dataSource: MatTableDataSource<Activity> = new MatTableDataSource<Activity>();

	constructor(
		protected authService: AuthenticationService,
		protected dataService: ActivityService,
		private providerService: ProviderService,
		@Inject(UserService) public userService: DataService,
		protected constants: Constants) {
		super(dataService, constants);
		this.checkNewButton();
	}

	checkNewButton(): void {
		if (this.actionsVisible()) {
			this.showNewButton = true;
		} else {
			this.showNewButton = this.authService.currentUser.approvedProvider;
		}
	}

	initColumns(): void {
		this.displayedColumns = [
			'Activities.name',
			'Categories.name',
			'Organisations.name',
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
			if (this.currentDetail.show_user) {
				this.userService.get(this.currentDetail.provider.user_id).subscribe(user => {
					this.currentUser = new User(user);
				});
			}
			this.sidenav.open();
		}
	}

	closeDetails(): void {
		this.currentDetail = null;
		this.currentUser = new User();
		this.sidenav.close();
	}
}
