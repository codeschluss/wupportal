import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
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
	templateUrl: 'organisationsform.html',
})
export class OrganisationsComponent implements AfterViewInit {
	displayedColumns = ['name', 'description', 'mail', 'phone', 'website'];
	exampleDatabase: HttpDao | null;
	dataSource = new MatTableDataSource();

	constructor(private http: HttpClient) { }

	ngAfterViewInit() {
		this.exampleDatabase = new HttpDao(this.http);
		Observable.merge()
			.startWith(null)
			.switchMap(() => {
				return this.exampleDatabase.getData();
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

// #### DEPRECATED ####

// import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
// import { DataSource } from '@angular/cdk/collections';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/startWith';
// import 'rxjs/add/operator/switchMap';
// import { Organisation } from 'app/models/organisation';
// import { OrganisationService } from 'app/services/organisation';
// import { NominatimService } from 'app/services/nominatim';
// import { HttpClient } from '@angular/common/http';
// import { Subscription } from 'rxjs/Subscription';
// import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

// @Component({
// 	selector: 'edit-organisation',
// 	styleUrls: ['../table-basic.css'],
// 	templateUrl: 'organisationsform.html',
// })

// export class OrganisationsComponent implements AfterViewInit {
// 	protected headers: Headers = new Headers({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' });
// 	public selectedOrga: Organisation;
// 	displayedColumns: Array<String> = ['id', 'name', 'info', 'eMail', 'telephone', 'website', 'street', 'housenumber', 'postalcode', 'place'];
// 	// organisationsDatabase: OrganisationsDatabase;
// 	organisationsDatabase: ExampleHttpDao | null;
// 	dataSource = new MatTableDataSource();
// 	public addressOrgaInput: string;

// 	resultsLength = 0;
// 	isLoadingResults = false;
// 	isRateLimitReached = false;

// 	@ViewChild(MatPaginator) paginator: MatPaginator;
// 	@ViewChild(MatSort) sort: MatSort;

// 	constructor(
// 		private organisationService: OrganisationService,
// 		public nominatimService: NominatimService,
// 		private http: HttpClient,
// 	) { }

// 	ngAfterViewInit() {
// 		this.organisationsDatabase = new ExampleHttpDao(this.http);
// 		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

// 		Observable.merge(this.sort.sortChange, this.paginator.page)
// 			.startWith(null).
// 			switchMap(() => {
// 				this.isLoadingResults = true;
// 				return this.organisationsDatabase!.getOrgas();
// 			})
// 			.map(data => {
// 				this.isLoadingResults = false;
// 				this.isRateLimitReached = false;
// 				this.resultsLength = data.total_count;

// 				return data.items;
// 			})
// 			.catch(() => {
// 				this.isLoadingResults = false;
// 				this.isRateLimitReached = true;
// 				return Observable.of([]);
// 			})
// 			.subscribe(data => this.dataSource.data = data);
// 	}
// }

// export interface OrganisationsApi {
// 	items: Organisation[];
// 	total_count: number;
// }

// /** An example database that the data source uses to retrieve data for the table. */
// export class ExampleHttpDao {
// 	constructor(private http: HttpClient) { }

// 	getOrgas(): Observable<OrganisationsApi> {
// 		return this.http.get<OrganisationsApi>("http://localhost:8765/api/organisations");
// 	}
// }

// // @ViewChild('filter') filter: ElementRef;

// // ngOnInit(): void {
// // 	this.dataSource = new MatTableDataSource(this.organisationsDatabase);
// // 	Observable.fromEvent(this.filter.nativeElement, 'keyup')
// // 		.debounceTime(150)
// // 		.distinctUntilChanged()
// // 		.subscribe(() => {
// // 			if (!this.dataSource) { return; }
// // 		});
// // }

// // createOrganisation(): void {
// // 	this.selectedOrga = new Organisation();
// // }

// // deselectOrganisation(): void {
// // 	this.selectedOrga = null;
// // }

// // onSubmitOrganisation(): Subscription {
// // 	if (this.selectedOrga.id) {
// // 		return this.http.put('http://localhost:8765' + '/organisation/' +
// // 			this.selectedOrga.id,
// // 			JSON.stringify(this.selectedOrga)
// // 			, { headers: this.headers }
// // 		).subscribe(newActivity => this.selectedOrga = newActivity.json());
// // 	} else {
// // 		this.nominatimService.get(this.addressOrgaInput).map(geoDate => {
// // 			this.selectedOrga.address.latitude = geoDate['lat'];
// // 			this.selectedOrga.address.longitude = geoDate['lon'];
// // 			this.selectedOrga.address.houseNumber = geoDate['address']['house_number'];
// // 			this.selectedOrga.address.postalCode = geoDate['address']['postcode'];
// // 			this.selectedOrga.address.place = geoDate['address']['city'];
// // 			this.selectedOrga.address.street = geoDate['address']['road'];
// // 		});
// // 	};
// //
// // 	return this.http.post('http://localhost:8765' + '/organisation/',
// // 		JSON.stringify(this.selectedOrga)
// // 		, { headers: this.headers }
// // 	).subscribe(newOrganisation => this.selectedOrga = newOrganisation.json());
// // }
// //
// // selectOrganisation(organisation: Organisation): void {
// // 	this.selectedOrga = organisation;
// // }
// // }



// export class OrganisationsDatabase {
// 	public organisations: Organisation[];
// 	dataChange: BehaviorSubject<Organisation[]> = new BehaviorSubject<Organisation[]>([]);

// 	constructor(private organisationService: OrganisationService) {
// 		this.organisations = new Array();
// 		this.organisationService.list().map(orgas => {
// 			orgas.forEach(orga => {
// 				this.organisations.push(orga);
// 				this.dataChange.next(this.organisations);
// 			});
// 		});
// 	}

// 	get data(): Organisation[] { return this.dataChange.value; }
// }

// // export class OrganisationsDataSource extends DataSource<any> {
// // 	constructor(private _organisationsDatabase: OrganisationsDatabase) {
// // 		super();
// // 	}

// // 	connect(): Observable<Organisation[]> {
// // 		return this._organisationsDatabase.dataChange;
// // 	}

// // 	disconnect(): void { }
// // }
