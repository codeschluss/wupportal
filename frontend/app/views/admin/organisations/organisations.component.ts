import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Organisation } from 'app/models/organisation';
import { OrganisationService } from 'app/services/organisation';
import { NominatimService } from 'app/services/nominatim';
import { Headers, Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'edit-organisation',
	styleUrls: ['../table-basic.css'],
	templateUrl: 'organisationsform.html',
})

export class OrganisationsComponent implements OnInit {
	protected headers: Headers = new Headers({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' });
	public selectedOrga: Organisation;
	displayedColumns: Array = ['id', 'name', 'info', 'eMail', 'telephone', 'website', 'street', 'housenumber', 'postalcode', 'place'];
	organisationsDatabase: OrganisationsDatabase = new OrganisationsDatabase(this.organisationService);
	dataSource: OrganisationsDataSource | null;
	public addressOrgaInput: string;

	constructor(
		private organisationService: OrganisationService,
		public nominatimService: NominatimService,
		private http: Http,
	) { }

	@ViewChild('filter') filter: ElementRef;

	ngOnInit(): void {
		this.dataSource = new OrganisationsDataSource(this.organisationsDatabase);
		Observable.fromEvent(this.filter.nativeElement, 'keyup')
			.debounceTime(150)
			.distinctUntilChanged()
			.subscribe(() => {
				if (!this.dataSource) { return; }
				this.dataSource.filter = this.filter.nativeElement.value;
			});
	}

	createOrganisation(): void {
		this.selectedOrga = new Organisation();
	}

	deselectOrganisation(): void {
		this.selectedOrga = null;
	}

	onSubmitOrganisation(): Subscription {
		if (this.selectedOrga.id) {
			return this.http.put('http://localhost:8765' + '/organisation/' +
				this.selectedOrga.id,
				JSON.stringify(this.selectedOrga)
				, { headers: this.headers }
			).subscribe(newActivity => this.selectedOrga = newActivity.json());
		} else {
			this.nominatimService.get(this.addressOrgaInput).then(results => {
				results.forEach(geoDate => {
					this.selectedOrga.addres.latitude = geoDate['lat'];
					this.selectedOrga.addres.longitude = geoDate['lon'];
					this.selectedOrga.addres.housenumber = geoDate['address']['house_number'];
					this.selectedOrga.addres.postalcode = geoDate['address']['postcode'];
					this.selectedOrga.addres.place = geoDate['address']['city'];
					this.selectedOrga.addres.street = geoDate['address']['road'];
				});
			});

			return this.http.post('http://localhost:8765' + '/organisation/',
				JSON.stringify(this.selectedOrga)
				, { headers: this.headers }
			).subscribe(newOrganisation => this.selectedOrga = newOrganisation.json());
		}
	}

	selectOrganisation(organisation: Organisation): void {
		this.selectedOrga = organisation;
	}
}

export class OrganisationsDatabase {
	public organisations: Organisation[];
	dataChange: BehaviorSubject<Organisation[]> = new BehaviorSubject<Organisation[]>([]);

	constructor(private organisationService: OrganisationService) {
		this.organisations = new Array();
		this.organisationService.list().then(orgas => {
			orgas.forEach(orga => {
				this.organisations.push(orga);
				this.dataChange.next(this.organisations);
			});
		});
	}

	get data(): Organisation[] { return this.dataChange.value; }
}

export class OrganisationsDataSource extends DataSource<any> {
	_filterChange: BehaviorSubject = new BehaviorSubject('');
	get filter(): string { return this._filterChange.value; }
	set filter(filter: string) { this._filterChange.next(filter); }

	constructor(private _organisationsDatabase: OrganisationsDatabase) {
		super();
	}

	connect(): Observable<Organisation[]> {
		const displayDataChanges = [
			this._organisationsDatabase.dataChange,
			this._filterChange,
		];
		return Observable.merge(...displayDataChanges).map(() => {
			return this._organisationsDatabase.data.slice().filter((item: Organisation) => {
				const searchStr = (item.name).toLowerCase();
				return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
			});
		});
	}

	disconnect(): void { }
}
