import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Organisation } from 'app/models/organisation';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'edit-organisation',
	styleUrls: ['../table-basic.css'],
	templateUrl: 'organisations.table.html',
})
export class OrganisationsComponent implements AfterViewInit {
	displayedColumns = ['name', 'description', 'mail', 'phone', 'website', 'address'];
	organisationDatabase: HttpDao | null;
	dataSource = new MatTableDataSource();
	resultsLength = 1;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private http: HttpClient) { }

	ngAfterViewInit() {
		this.organisationDatabase = new HttpDao(this.http);
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		Observable.merge(this.sort.sortChange, this.paginator.page)
			.startWith(null)
			.switchMap(() => {
				return this.organisationDatabase.getData();
			})
			.map(data => {
				return data;
			})
			.catch(() => {
				return Observable.of([]);
			})
			.subscribe(data => this.dataSource.data = data);
	}
}

export class HttpDao {
	constructor(private http: HttpClient) { }
	getData(): Observable<Organisation[]> {
		return this.http.get<Organisation[]>('http://localhost:8765/api/organisations');
	}
}
