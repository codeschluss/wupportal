import { Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { DialogComponent } from 'app/views/common/popup.component';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { DataServiceFactory, OrganisationService } from 'app/services/data.service.factory';
import { Organisation } from 'app/models/organisation';
import { DataService } from 'app/services/data.service';

@Component({
	selector: 'edit-organisation',
	styleUrls: ['../table-basic.css'],
	templateUrl: 'organisations.table.html',
	providers: [
		{ provide: OrganisationService, useFactory: DataServiceFactory('organisations'), deps: [HttpClient] }
	]
})

export class OrganisationsComponent implements AfterViewInit {
	displayedColumns: String[] = ['name', 'description', 'mail', 'phone', 'website', 'address', 'action'];
	dataSource: MatTableDataSource<Organisation> = new MatTableDataSource();
	resultsLength: Number;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	applyFilter(filterValue: string): void {
		filterValue = filterValue.trim();
		filterValue = filterValue.toLowerCase();
		this.dataSource.filter = filterValue;
	}

	constructor(
		@Inject(OrganisationService) private service: DataService,
		public dialog: MatDialog,
	) { }

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		// this.service.list()
		// 	.subscribe(data => this.dataSource.data = data);
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
