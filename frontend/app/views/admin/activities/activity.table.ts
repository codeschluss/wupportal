import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { Activity } from 'app/models/activity';
import { ActivityService } from 'app/services/activity';
import { DialogComponent } from 'app/views/common/popup.component';
import { Constants } from 'app/views/common/constants';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'edit-activities',
	styleUrls: ['../table.abstract.css'],
	templateUrl: 'activity.table.html',
})

export class ActivityTableComponent implements AfterViewInit {
	displayedColumns: String[] = ['name', 'description', 'schedule', 'tags', 'target_groups', 'action'];
	dataSource: MatTableDataSource<Activity> = new MatTableDataSource();
	resultsLength: Number;


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	applyFilter(filterValue: string): void {
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
	}

	constructor(
		private service: ActivityService,
		public dialog: MatDialog,
		public constants: Constants,
	) { }

	ngAfterViewInit(): void {
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		Observable.merge(this.sort.sortChange, this.paginator.page)
			.startWith(null)
			.switchMap(() => {
				return this.service.list();
			})
			.map(data => {
				return data;
			})
			.catch(() => {
				return Observable.of([]);
			})
			.subscribe(data => this.dataSource.data = data);
	}

	openDialog(row: any): void {
		const dialogRef = this.dialog.open(DialogComponent, {
			width: '250px',
			data: {
				name: row.name,
				message: 'wollen Sie diesen Eintrag wirklich löschen? ',
				id: row.id
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			// this.ngAfterViewInit();
		});
	}
}
