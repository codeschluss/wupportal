import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { DataSource } from '@angular/cdk/table';

import { DataServiceFactory, AddressService } from 'app/services/data.service.factory';
import { Address } from 'app/models/address';
import { AddressAutocompleteComponent } from 'app/views/admin/addresses/address.autocomplete';
import { DataService } from 'app/services/data.service';
import { AbstractTableComponent } from 'app/views/admin/table.abstract';
import { AuthenticationService } from 'app/services/authentication.service';
import { Constants } from 'app/services/constants';

import * as moment from 'moment';

@Component({
	selector: 'address-table',
	styleUrls: ['../table.abstract.css'],
	templateUrl: 'address.table.html',
	providers: [
		{ provide: AddressService, useFactory: DataServiceFactory(AddressService), deps: [HttpClient, AuthenticationService] }
	]
})

export class AddressTableComponent extends AbstractTableComponent implements OnInit {

	@Input() providers: Array<string> = [];
	@Input() showActions: boolean = false;

	showNewButton: boolean = false;
	dataSource: MatTableDataSource<Address> = new MatTableDataSource<Address>();

	constructor(
		protected authService: AuthenticationService,
		@Inject(AddressService) public dataService: DataService,
		protected constants: Constants) {
		super(dataService, constants);
	}

	initColumns(): void {
		this.displayedColumns = [
			'Address.street',
			'Address.house_number',
			'Address.postal_code',
			'Address.place',
			'Suburb.name',
			'Address.latitude',
			'Address.longitude',
			'action'
		];
	}

	newAddress(): void {
	}

	editAddress(row: Address): void {
	}

}
