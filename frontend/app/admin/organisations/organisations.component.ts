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
import { Organisation } from '../../common/model/organisation';
import { OrgaService } from '../../services/organisation.service';
import { Headers, Http } from '@angular/http';

@Component({
	selector: 'editorga',
	styleUrls: ['../table-basic.css'],
	templateUrl: './organisationsform.html',
})

export class OrganisationsComponent {
	protected headers = new Headers({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' });
	public selectedOrga: Organisation;
	displayedColumns = ['id', 'name', 'info', 'eMail', 'telephone', 'website', 'street', 'housenumber', 'postalcode', 'place'];
	organisationsDatabase = new OrganisationsDatabase(this.organisationService);
	dataSource: OrganisationsDataSource | null;

	constructor(
		private organisationService: OrgaService,
		private http: Http
	) { }

	@ViewChild('filter') filter: ElementRef;

	ngOnInit() {
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

	onSubmitOrganisation() {
		if (this.selectedOrga.id) {
			return this.http.put('http://localhost:8765' + '/organisation/' +
				this.selectedOrga.id,
				JSON.stringify(this.selectedOrga)
				, { headers: this.headers }
			).subscribe(newActivity => this.selectedOrga = newActivity.json());
		}
		else {
			return this.http.post('http://localhost:8765' + '/organisation/',
				JSON.stringify(this.selectedOrga)
				, { headers: this.headers }
			).subscribe(newOrganisation => this.selectedOrga = newOrganisation.json());
		}
	}

	selectOrganisation(organisation: Organisation) {
		this.selectedOrga = organisation;
	}
}

export class OrganisationsDatabase {
	public organisations: Organisation[];
	dataChange: BehaviorSubject<Organisation[]> = new BehaviorSubject<Organisation[]>([]);

	constructor(private organisationService: OrgaService) {
		this.organisations = new Array();
		this.organisationService.getOrgas().then(orgas => {
			orgas.forEach(orga => {
				this.organisations.push(orga);
				this.dataChange.next(this.organisations);
			});
		});
	}

	get data(): Organisation[] { return this.dataChange.value; }
}

export class OrganisationsDataSource extends DataSource<any> {
	_filterChange = new BehaviorSubject('');
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
				return searchStr.indexOf(this.filter.toLowerCase()) != -1;
			});
		});
	}

	disconnect() { }
}
